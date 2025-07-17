import { Routes } from "@angular/router";
import { InternoAcceptComponent } from './interno-accept/interno-accept';
import { InternoHomeComponent } from './interno-home/interno-home';
import { InternoCalendarComponent } from "./interno-calendar/interno-calendar";

export const internoRoutes: Routes = [
  { path: 'interno-accept', component: InternoAcceptComponent },
  { path: 'interno-home', component: InternoHomeComponent },
  { path: 'interno-calendar', component: InternoCalendarComponent },
];