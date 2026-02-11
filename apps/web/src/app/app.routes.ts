import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { HomepageComponent } from './components/homepage/homepage.component';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', component: HomepageComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'show/:id', component: ShowDetailComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'login' },
];
