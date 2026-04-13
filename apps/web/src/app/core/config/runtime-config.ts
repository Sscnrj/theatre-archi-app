import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface RuntimeConfig {
  production: boolean;
  springApi: string;
  authApi: string;
  paymentApi: string;
  authEnabled: boolean;
}

export const APP_RUNTIME_CONFIG = new InjectionToken<RuntimeConfig>('APP_RUNTIME_CONFIG', {
  providedIn: 'root',
  factory: () => environment,
});
