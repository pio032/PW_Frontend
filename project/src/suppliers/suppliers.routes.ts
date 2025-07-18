import { Routes } from  '@angular/router';
import { Suppliers } from './suppliers';
import { ListaPrenotazioni } from './lista-prenotazioni/lista-prenotazioni';
import { RichiestaPrenotazioni } from './richiesta-prenotazioni/richiesta-prenotazioni';

export const suppliersRoutes: Routes = [
  {path: 'suppliers', component: Suppliers},
  {path: 'suppliers/listaPrenotazioni', component: ListaPrenotazioni},
  {path: 'suppliers/richiestaPrenotazioni', component: RichiestaPrenotazioni}
];
