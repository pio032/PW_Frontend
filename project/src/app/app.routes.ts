import { Routes } from '@angular/router';
import { Outsider } from '../outsider/outsider';
import { Login } from '../login/login';
import { Suppliers } from '../suppliers/suppliers';
import { ListaPrenotazioni } from '../suppliers/lista-prenotazioni/lista-prenotazioni';
import { RichiestaPrenotazioni } from '../suppliers/richiesta-prenotazioni/richiesta-prenotazioni';
import { internoRoutes } from '../interno/interno.routes';
import { receptionistRoutes } from '../receptionist/receptionist.routes';

export const routes: Routes = [
  { path: 'outsider', component: Outsider },
  { path: 'interno', children: internoRoutes },
  { path: 'login', component: Login },
  { path: 'suppliers', component: Suppliers },
  { path: 'receptionist', children: receptionistRoutes },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'suppliers/listaPrenotazioni', component: ListaPrenotazioni },
  { path: 'suppliers/richiestaPrenotazioni', component: RichiestaPrenotazioni },
];
