import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APP_RUNTIME_CONFIG } from '../config/runtime-config';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const config = inject(APP_RUNTIME_CONFIG);
  const authService = inject(AuthService);

  if (!config.authEnabled) {
    authService.ensureDemoSession();
    return true;
  }

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: { redirectTo: state.url },
  });
};
