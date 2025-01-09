import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NewContactComponent } from './pages/new-contact/new-contact.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'contact/:id',
    component: ContactComponent,
  },
  {
    path: 'new',
    component: NewContactComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
