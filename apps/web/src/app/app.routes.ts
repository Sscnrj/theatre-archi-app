import { Routes } from '@angular/router';
import { UserComponent } from './User/user.component';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'reservations', component: UserComponent, canActivate: [AuthGuard] },
];

