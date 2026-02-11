import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

export type LoginResponse = {
  access_token: string;
  user: any;
};

export type RegisterRequest = {
  email: string;
  password: string;
  nom: string;
  prenom: string;
};

export type RegisterResponse = {
  message: string;
  user: any;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${environment.authApi}/auth/login`, { email, password })
      .pipe(tap((res) => localStorage.setItem(this.TOKEN_KEY, res.access_token)));
  }

  register(payload: RegisterRequest) {
    return this.http.post<RegisterResponse>(`${environment.authApi}/auth/register`, payload);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
