import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import {ShowDetailComponent} from "./components/show-detail/show-detail.component";

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'show/:id', component: ShowDetailComponent },
  { path: '**', redirectTo: '' }
];
