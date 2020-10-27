import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ClientReportComponent } from './client-report/client-report.component';
import { CoachReportComponent } from './coach-report/coach-report.component';
import { EventReportComponent } from './event-report/event-report.component';
import { VisitorReportComponent } from './visitor-report/visitor-report.component';
import { EventReservationReportComponent } from './event-reservation-report/event-reservation-report.component';
import { SessionReservationReportComponent } from './session-reservation-report/session-reservation-report.component';
import { PagesModule } from '../pages.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalModule, PaginationModule, PopoverModule, BsDatepickerModule, BsDropdownModule, BsLocaleService, BsDatepickerConfig } from 'ngx-bootstrap';
import { ReportsService } from '../../../services/reports/reports.service';
import { NbCardModule, NbInputModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/admin/', '.json');
}
@NgModule({
  declarations: [
    ClientReportComponent,
    CoachReportComponent, 
    EventReportComponent, 
    VisitorReportComponent, 
    EventReservationReportComponent,
    SessionReservationReportComponent
  ],
  imports: [
    CommonModule,
    PagesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReportsRoutingModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NbCardModule,
    NbInputModule,
    FormsModule
  ],
  providers:[ReportsService],
  exports:[BsDatepickerModule],
})
export class ReportsModule { }
