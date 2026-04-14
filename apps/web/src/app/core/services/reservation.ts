import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_RUNTIME_CONFIG } from '../config/runtime-config';
import { CreateReservationRequest, ReservationItem } from '../models/reservation.models';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_RUNTIME_CONFIG);
  private readonly endpoint = `${this.config.springApi}/reservations`;

  create(payload: CreateReservationRequest): Observable<ReservationItem> {
    return this.http.post<ReservationItem>(this.endpoint, payload);
  }

  listMine(): Observable<ReservationItem[]> {
    return this.http.get<ReservationItem[]>(`${this.endpoint}/mes-reservations`);
  }

  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
