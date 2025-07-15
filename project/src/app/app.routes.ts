import { Routes } from '@angular/router';
import { Outsider } from '../outsider/outsider';
import { Interno } from '../interno/interno';
import { Login } from '../login/login';
import { Suppliers } from '../suppliers/suppliers';
import { Receptionist } from '../receptionist/receptionist';

export const routes: Routes = [
  { path: 'outsider', component: Outsider },
  { path: 'interno', component: Interno },
  { path: 'login', component: Login },
  { path: 'supliers', component: Suppliers },
  { path: 'receptionist', component: Receptionist },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
