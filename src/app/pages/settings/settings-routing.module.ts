
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages.component';
import { JobsComponent } from './jobs/jobs.component';
import { CountriesComponent } from './countries/countries.component';
import { PartnersComponent } from './partner/partners.component';
import { StoriesComponent } from './story/stories.component';
import { FaqsComponent } from './faq/faqs.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'jobs', component:  JobsComponent },
      { path: 'country', component:  CountriesComponent },
      { path: 'partner', component:  PartnersComponent },
      { path: 'story', component:  StoriesComponent },
      { path: 'faq', component:  FaqsComponent },
    ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

