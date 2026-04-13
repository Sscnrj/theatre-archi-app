import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Spectacles } from './pages/spectacles/spectacles';
import { SpectacleDetail } from './pages/spectacle-detail/spectacle-detail';
import { Reservations } from './pages/reservations/reservations';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'spectacles' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'spectacles', component: Spectacles, canActivate: [authGuard] },
  { path: 'spectacles/:id', component: SpectacleDetail, canActivate: [authGuard] },
  { path: 'reservations', component: Reservations, canActivate: [authGuard] },
  { path: '**', redirectTo: 'spectacles' },
];
