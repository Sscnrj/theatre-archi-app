import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_RUNTIME_CONFIG } from '../config/runtime-config';
import { SpectacleItem } from '../models/spectacle.models';

@Injectable({
  providedIn: 'root',
})
export class SpectacleService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_RUNTIME_CONFIG);
  private readonly endpoint = `${this.config.springApi}/spectacles`;

  list(): Observable<SpectacleItem[]> {
    return this.http.get<SpectacleItem[]>(this.endpoint);
  }

  getById(id: number): Observable<SpectacleItem> {
    return this.http.get<SpectacleItem>(`${this.endpoint}/${id}`);
  }
}
