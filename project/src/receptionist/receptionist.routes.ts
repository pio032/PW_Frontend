import { Routes } from "@angular/router";
import { ReceptionistElencoComponent } from './receptionist-elenco/receptionist-elenco';
import { ReceptionistHomeComponent } from './receptionist-home/receptionist-home';
import { ReceptionistCalendarComponent } from "./receptionist-calendar/receptionist-calendar";

export const receptionistRoutes: Routes = [
  { path: 'receptionist-elenco', component: ReceptionistElencoComponent },
  { path: 'receptionist-home', component: ReceptionistHomeComponent },
  { path: 'receptionist-calendar', component: ReceptionistCalendarComponent },
];