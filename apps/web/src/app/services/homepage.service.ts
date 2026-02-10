import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Show } from '../models/show';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private apiKey = 'GPJ2QkZilGujGdD5NhTRGYupe0HfuZfc';
  private apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';

  constructor(private http: HttpClient) {}

  private getByCountry(country: string): Observable<Show[]> {
    const params = new URLSearchParams({
      apikey: this.apiKey,
      countryCode: country,
      classificationName: 'music',
      size: '20',
      sort: 'date,asc'
    });

    const url = `${this.apiUrl}?${params.toString()}`;

    return this.http.get<any>(url).pipe(
        map(response => {
          const events = response?._embedded?.events || [];
          return events.map((e: any) => {
            const venue = e._embedded?.venues?.[0];
            return {
              id: e.id,
              title: e.name,
              place: venue?.name || 'Lieu inconnu',
              address: venue?.address?.line1 || '',
              date: e.dates?.start?.localDate || '',
              imageUrl: e.images?.[0]?.url || 'assets/img/default.jpg'
            } as Show;
          });
        })
    );
  }

  getShows(): Observable<Show[]> {
    return forkJoin([
      this.getByCountry('FR'),
      this.getByCountry('CA')
    ]).pipe(
        map(([fr, ca]) => {
          // fusion FR + CA
          const all = [...fr, ...ca];

          // tri date asc
          return all.sort((a, b) => a.date.localeCompare(b.date));
        })
    );
  }

  getShowDetails(id: string): Observable<Show> {
    const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${this.apiKey}`;

    return this.http.get<any>(url).pipe(
        map(e => {
          const venue = e._embedded?.venues?.[0];
          return {
            id: e.id,
            title: e.name,
            place: venue?.name || 'Lieu inconnu',
            address: venue?.address?.line1 || '',
            date: e.dates?.start?.localDate || '',
            imageUrl: e.images?.[0]?.url || 'assets/img/default.jpg',
            ticketUrl: e.url,
            priceMin: e.priceRanges?.[0]?.min,
            priceMax: e.priceRanges?.[0]?.max,

          } as Show;
        })
    );
  }

}
