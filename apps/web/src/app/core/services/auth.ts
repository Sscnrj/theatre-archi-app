import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { APP_RUNTIME_CONFIG } from '../config/runtime-config';
import {
  AuthSession,
  AuthUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_RUNTIME_CONFIG);

  private readonly tokenStorageKey = 'theatre.access_token';
  private readonly emailStorageKey = 'theatre.user_email';
  private readonly nomStorageKey = 'theatre.user_nom';
  private readonly prenomStorageKey = 'theatre.user_prenom';
  private readonly roleStorageKey = 'theatre.user_role';
  private readonly modeStorageKey = 'theatre.session_mode';

  private readonly sessionState = signal<AuthSession | null>(this.restoreSession());
  readonly session = this.sessionState.asReadonly();
  readonly isLoggedInSignal = computed(() => this.sessionState() !== null);

  constructor() {
    if (!this.config.authEnabled) {
      this.ensureDemoSession();
    }
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    if (!this.config.authEnabled) {
      const demoSession = this.buildDemoSession(payload.email);
      this.applySession(demoSession);

      return of({
        access_token: demoSession.accessToken,
        user: demoSession.user,
      });
    }

    return this.http.post<LoginResponse>(`${this.config.authApi}/auth/login`, payload).pipe(
      tap((response) => {
        this.applySession({
          accessToken: response.access_token,
          user: response.user,
          mode: 'real',
        });
      }),
    );
  }

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    if (!this.config.authEnabled) {
      return of({
        message: 'Mode démo: utilisateur simulé créé.',
        user: {
          email: payload.email,
          nom: payload.nom,
          prenom: payload.prenom,
          role: 'USER',
        },
      });
    }

    return this.http.post<RegisterResponse>(`${this.config.authApi}/auth/register`, payload);
  }

  logout(): void {
    this.clearSession();
    if (!this.config.authEnabled) {
      this.ensureDemoSession();
    }
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSignal();
  }

  getAuthToken(): string | null {
    return this.sessionState()?.accessToken ?? null;
  }

  ensureDemoSession(email = 'demo@theatre.local'): void {
    if (this.sessionState()) {
      return;
    }
    this.applySession(this.buildDemoSession(email));
  }

  private buildDemoSession(email: string): AuthSession {
    const sanitizedEmail = email.trim() || 'demo@theatre.local';
    const user: AuthUser = {
      id: 'demo-user',
      email: sanitizedEmail,
      nom: 'Mode',
      prenom: 'Démo',
      role: 'USER',
    };

    return {
      accessToken: 'demo-token',
      user,
      mode: 'demo',
    };
  }

  private applySession(session: AuthSession): void {
    this.persistSession(session);
    this.sessionState.set(session);
  }

  private persistSession(session: AuthSession): void {
    localStorage.setItem(this.tokenStorageKey, session.accessToken);
    localStorage.setItem(this.emailStorageKey, session.user.email);
    localStorage.setItem(this.nomStorageKey, session.user.nom ?? '');
    localStorage.setItem(this.prenomStorageKey, session.user.prenom ?? '');
    localStorage.setItem(this.roleStorageKey, session.user.role ?? '');
    localStorage.setItem(this.modeStorageKey, session.mode);
  }

  private restoreSession(): AuthSession | null {
    const accessToken = localStorage.getItem(this.tokenStorageKey);
    const email = localStorage.getItem(this.emailStorageKey);

    if (!accessToken || !email) {
      return null;
    }

    const nom = localStorage.getItem(this.nomStorageKey) || undefined;
    const prenom = localStorage.getItem(this.prenomStorageKey) || undefined;
    const role = localStorage.getItem(this.roleStorageKey) || undefined;
    const mode = localStorage.getItem(this.modeStorageKey) === 'demo' ? 'demo' : 'real';

    return {
      accessToken,
      mode,
      user: {
        email,
        nom,
        prenom,
        role,
      },
    };
  }

  private clearSession(): void {
    localStorage.removeItem(this.tokenStorageKey);
    localStorage.removeItem(this.emailStorageKey);
    localStorage.removeItem(this.nomStorageKey);
    localStorage.removeItem(this.prenomStorageKey);
    localStorage.removeItem(this.roleStorageKey);
    localStorage.removeItem(this.modeStorageKey);
    this.sessionState.set(null);
  }
}
