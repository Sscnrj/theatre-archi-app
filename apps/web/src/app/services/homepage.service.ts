import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Spectacle } from '../models/spectacle';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private apiUrl = `${environment.springApi}/spectacles`;

  constructor(private http: HttpClient) {}

  // 🔁 Liste des spectacles depuis la BDD
  getShows(): Observable<Spectacle[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(shows =>
        shows.map(s => ({
          id: s.id,
          title: s.titre,
          place: s.lieu,
          address: s.adresse,
          date: s.date,
          imageUrl: s.imageUrl || 'assets/img/default.jpg',
          priceMin: s.prix,
          priceMax: s.prix,
        }) as Spectacle)
      )
    );
  }

  // 🔍 Détail spectacle
  getShowDetails(id: string): Observable<Spectacle> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(s => ({
        id: s.id,
        title: s.titre,
        place: s.lieu,
        address: s.adresse,
        date: s.date,
        imageUrl: s.imageUrl || 'assets/img/default.jpg',
        priceMin: s.prix,
        priceMax: s.prix,
      }) as Spectacle)
    );
  }
}
