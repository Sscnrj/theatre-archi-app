import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Show } from '../models/show';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  // URL de ton API Spring Boot (à adapter selon ton Controller)
  private apiUrl = `${environment.apiUrl}/spectacles`;

  private apiUrl = 'http://localhost:8080/api/spectacles';

  /**
   * Récupère tous les spectacles depuis ton backend
   */
  getShows(): Observable<Show[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(s => this.mapToShow(s)))
    );
  }

  /**
   * Récupère un spectacle précis par son ID
   */
  getShowDetails(id: string): Observable<Show> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(s => this.mapToShow(s))
    );
  }

  /**
   * Helper pour transformer le format Java (titre, dateSpectacle)
   * vers le format TypeScript (title, date)
   */
  private mapToShow(s: any): Show {
    return {
      id: s.id,
      title: s.titre,          // Mappe 'titre' -> 'title'
      description: s.description,
      date: s.dateSpectacle,   // Mappe 'dateSpectacle' -> 'date'
      price: s.prix,           // Mappe 'prix' -> 'price'
      imageUrl: s.imageUrl || 'assets/img/default.jpg'
    };
  }
}
