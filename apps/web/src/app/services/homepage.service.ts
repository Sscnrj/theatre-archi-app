import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spectacle } from '../models/spectacle';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  private apiUrl = `${environment.springApi}/spectacles`;

  constructor(private http: HttpClient) {}

  getShows(): Observable<Spectacle[]> {
    return this.http.get<Spectacle[]>(this.apiUrl);
  }

  getShowDetails(id: number): Observable<Spectacle> {
    return this.http.get<Spectacle>(`${this.apiUrl}/${id}`);
  }
}
