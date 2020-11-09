import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages.component';
import { SessionComponent } from './session/session.component';
import { EventsComponent } from './events/events.component';
import { ServicesComponent } from './services/services.component';
import { ReservationSessionComponent } from './reservation-session/reservation-session.component';
import { RolesComponent } from './roles/roles.component';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { EmployeesComponent } from './employees/employees.component';
import { ShowAdminProfileComponent } from './employees/show-admin-profile/show-admin-profile.component';
import { ClientsComponent } from './clients/clients.component';
import { ChildernComponent } from './clients/childern/childern.component';
import { CoachesComponent } from './coaches/coaches.component';
import { CoachProfileComponent } from './coaches/coach-profile/coach-profile.component';
import { ReservationEventComponent } from './reservation-event/reservation-event.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { AddEventReservationComponent } from './reservation-event/add-event-reservation/add-event-reservation.component';
import { AddSessionReservationComponent } from './reservation-session/add-session-reservation/add-session-reservation.component';
import { PackagesComponent } from './packages/packages.component';
import { CoursesComponent } from './courses/courses.component';
import { ReservationCourseComponent } from './reservation-course/reservation-course.component';
import { AddCourseReservationComponent } from './reservation-course/add-course-reservation/add-course-reservation.component';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'sessions', component:  SessionComponent },
      { path: 'package', component:  PackagesComponent },
      { path: 'Course', component:  CoursesComponent },
      { path: 'events', component:  EventsComponent },
      { path: 'events/:id', component:  AddEventComponent },
      { path: 'coaches', component:  CoachesComponent },
      { path: 'services', component:  ServicesComponent },
      { path: 'roles', component:  RolesComponent },
      { path: 'employees', component:  EmployeesComponent },
      { path: 'add-role', component:  AddRoleComponent },
      { path: 'clients', component:  ClientsComponent },
      { path: 'childern/:id', component:  ChildernComponent },
      { path: 'reservation-session', component:  ReservationSessionComponent },
      { path: 'reservation-event', component:  ReservationEventComponent },
      { path: 'reservation-event/:id', component:  AddEventReservationComponent },
      { path: 'reservation-session/:id', component:  AddSessionReservationComponent },
      //reservation-course
      { path: 'reservation-course', component:  ReservationCourseComponent },
      { path: 'reservation-course/:id', component:  AddCourseReservationComponent },
      { path: 'show-profile/:id', component: ShowAdminProfileComponent },
      { path: 'coach-profile/:id', component: CoachProfileComponent },

    ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

