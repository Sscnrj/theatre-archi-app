import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import {ShowDetailComponent} from "./components/show-detail/show-detail.component";
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'user', component: UserComponent }, // route vers la page User
  { path: 'show/:id', component: ShowDetailComponent },
  { path: '**', redirectTo: '' }
];
