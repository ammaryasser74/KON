import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule, NbInputModule, NbToastrService,NbSelectModule, NbTooltipModule, NbPopoverModule, NbRadioModule, NbIconModule, NbCalendarModule, NbSpinnerModule
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminRoutingModule } from './admin-routing.module';
import { CoachesComponent } from './coaches/coaches.component';
import { ClientsComponent } from './clients/clients.component';
import { SessionComponent } from './session/session.component';
import { ReservationSessionComponent } from './reservation-session/reservation-session.component';
import { EventsComponent } from './events/events.component';
import {
  ModalModule,
  PopoverModule,
  BsDatepickerModule,
  BsDropdownModule,
  BsDatepickerConfig,
  BsModalService,
  TimepickerModule
} from 'ngx-bootstrap';
import { PagesModule } from '../pages.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ServicesComponent } from './services/services.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { CityService } from '../../../services/settings/cities.service';
import { AddSessionComponent } from './session/add-session/add-session.component';
import { SessionService } from '../../../services/admin/session.service';
import { RolesComponent } from './roles/roles.component';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { RolesService } from '../../../services/admin/role.service';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EmployeeService } from '../../../services/admin/Employee.service';
import { AddServiceComponent } from './services/add-service/add-service.component';
import { ServiceService } from '../../../services/admin/service.service';
import { FsIconComponent } from './services/services.component';
import { CountryService } from '../../../services/settings/country.service';
import { ShowAdminProfileComponent } from './employees/show-admin-profile/show-admin-profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { ClientService } from '../../../services/admin/client.service';
import { ChildernComponent } from './clients/childern/childern.component';
import { AddChildernComponent } from './clients/childern/add-childern/add-childern.component';
import { JobService } from '../../../services/settings/job.service';
import { ButtonRenderComponent } from './clients/button.render.component';
import { ChildService } from '../../../services/admin/children.service';
import { EventService } from '../../../services/admin/event.service';
import { AddEventComponent } from './events/add-event/add-event.component';
import { CoachService } from '../../../services/admin/coaches.service';
import { AddCoachComponent } from './coaches/add-coach/add-coach.component';
import { ButtonRenderShowProfileComponent } from './coaches/button.render.component';
import { CoachProfileComponent } from './coaches/coach-profile/coach-profile.component';
import { AddExperienceComponent } from './coaches/coach-profile/add-experience/add-experience.component';
import { AddAvaliableTimeComponent } from './coaches/coach-profile/add-avaliable-time/add-avaliable-time.component';
import { AddSessionCaochesComponent } from './coaches/coach-profile/add-session/add-session.component';
import { CoachSessionService } from '../../../services/admin/coachsession.service';
import { ExperienceService } from '../../../services/admin/experience.service';

import { FullCalendarModule } from '@fullcalendar/angular';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { TimeService } from '../../../services/admin/avaliabletime.service';
import { AddSessionReservationComponent } from './reservation-session/add-session-reservation/add-session-reservation.component';
import { ReservationService } from '../../../services/admin/reservation.service';
import { PaymentMethodService } from '../../../services/settings/PaymentMethod.service';
import { EventReservationReportComponent } from '../reports/event-reservation-report/event-reservation-report.component';
import { AddEventReservationComponent } from './reservation-event/add-event-reservation/add-event-reservation.component';
import { ReservationEventComponent } from './reservation-event/reservation-event.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';

import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { PackagesComponent } from './packages/packages.component';
import { AddPackagesComponent } from './packages/add-packages/add-packages.component';
import { PackagesService } from '../../../services/admin/packages.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/admin/', '.json');
}
@NgModule({
  imports: [
    PagesModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    FullCalendarModule,
    NbListModule,
    NbAccordionModule,
    NbSelectModule,
    NbTooltipModule,
    NbRadioModule,
    NbPopoverModule,
    NbIconModule,
    NbUserModule,
    NbCalendarModule,
    AdminRoutingModule,
    NbSpinnerModule,
    TimepickerModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
  }),
    PopoverModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ngFormsModule,
    NbInputModule,
    NgxSpinnerModule
  ],

  declarations: [
      CoachesComponent,
      ClientsComponent,
      ReservationEventComponent,
      AddEventReservationComponent,
      SessionComponent,
      ReservationSessionComponent,
      EventsComponent,
      ServicesComponent,
      AddSessionComponent,
      RolesComponent,
      AddRoleComponent,
      EmployeesComponent,
      AddEmployeeComponent,
      AddServiceComponent,
      FsIconComponent,
      ShowAdminProfileComponent,
      ResetPasswordComponent,
      AddClientComponent,
      ChildernComponent,
      AddChildernComponent,
      ButtonRenderComponent,
      AddEventComponent,
      AddCoachComponent,
      ButtonRenderShowProfileComponent,
      CoachProfileComponent,
      AddExperienceComponent,
      AddAvaliableTimeComponent,
      AddSessionCaochesComponent,
      AddSessionReservationComponent,
      LoadingComponent,
      //packages
      PackagesComponent,
      AddPackagesComponent
  ],
  entryComponents:[
    AddSessionComponent,
    AddEmployeeComponent,
    ResetPasswordComponent,
    AddClientComponent,
    AddServiceComponent,
    ButtonRenderComponent,
    ButtonRenderShowProfileComponent,
    AddChildernComponent,
    AddCoachComponent,
    AddSessionCaochesComponent,
    AddExperienceComponent,
    AddAvaliableTimeComponent,
    //packages
    AddPackagesComponent
   
  ],
  providers: [
    CityService,
    NbToastrService,
    SessionService,
    RolesService,
    EmployeeService,
    ServiceService,
    CountryService,
    ClientService,
    JobService,
    ChildService,
    EventService,
    CoachService,
    CoachSessionService,
    ExperienceService,
    TimeService,
    ReservationService,
    PaymentMethodService,
    NgxSpinnerService,
    //packages
    PackagesService
   
  ],

})
export class AdminModule { }
