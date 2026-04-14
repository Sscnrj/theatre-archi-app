import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { APP_RUNTIME_CONFIG } from '../config/runtime-config';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(APP_RUNTIME_CONFIG);
  const authService = inject(AuthService);

  if (!config.authEnabled || req.url.startsWith(config.authApi)) {
    return next(req);
  }

  const token = authService.getAuthToken();
  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
