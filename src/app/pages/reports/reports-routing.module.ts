import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages.component';
import { VisitorReportComponent } from './visitor-report/visitor-report.component';
import { ClientReportComponent } from './client-report/client-report.component';
import { CoachReportComponent } from './coach-report/coach-report.component';
import { EventReportComponent } from './event-report/event-report.component';
import { EventReservationReportComponent } from './event-reservation-report/event-reservation-report.component';
import { SessionReservationReportComponent } from './session-reservation-report/session-reservation-report.component';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'visitor-report', component:  VisitorReportComponent },
      { path: 'client-report', component:  ClientReportComponent },
      { path: 'coach-report', component:  CoachReportComponent },
      { path: 'event-report', component:  EventReportComponent },

      { path: 'reservation-event-report', component:  EventReservationReportComponent },
      { path: 'reservation-session-report', component:  SessionReservationReportComponent },
   
    ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

