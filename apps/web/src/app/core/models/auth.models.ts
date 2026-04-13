export interface AuthUser {
  id?: number | string;
  email: string;
  nom?: string;
  prenom?: string;
  role?: string;
}

export interface AuthSession {
  accessToken: string;
  user: AuthUser;
  mode: 'real' | 'demo';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nom: string;
  prenom: string;
}

export interface RegisterResponse {
  message: string;
  user: AuthUser;
}
