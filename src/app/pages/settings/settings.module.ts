import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';

import { SettingsRoutingModule } from './settings-routing.module';
import { PagesModule } from '../pages.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { JobsComponent } from './jobs/jobs.component';
import { AddJobComponent } from './jobs/add-job/add-job.component';
import { CitiesComponent } from './cities/cities.component';
import { CountriesComponent } from './countries/countries.component';
import { AddCountryComponent } from './countries/add-country/add-country.component';
import { AddCityComponent } from './cities/add-city/add-city.component';
import { JobService } from '../../../services/settings/job.service';
import { CityService } from '../../../services/settings/cities.service';
import { CountryService } from '../../../services/settings/country.service';
import { AddPartnerComponent } from './partner/add-partner/add-partner.component';
import { PartnersComponent } from './partner/partners.component';
import { StoriesComponent } from './story/stories.component'
import { PartnerService } from '../../../services/settings/partner.service';
import { StoryService } from '../../../services/settings/story.service';
import { AddStoryComponent } from './story/add-story/add-story.component';
import { FAQService } from '../../../services/settings/faq.service';
import { FaqsComponent } from './faq/faqs.component';
import { AddFaqComponent } from './faq/add-faq/add-faq.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/Settings/', '.json');
}
@NgModule({
  imports: [
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    SettingsRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  entryComponents:[
    AddCountryComponent,
    AddCityComponent,
    AddJobComponent,
    AddPartnerComponent,
    AddStoryComponent,
    AddFaqComponent
  ],
    declarations: [

    JobsComponent,
    AddJobComponent,
    CitiesComponent,
    CountriesComponent,
    AddCountryComponent,
    AddCityComponent,
    AddPartnerComponent,
    PartnersComponent,
    AddStoryComponent,
    StoriesComponent,
    FaqsComponent,
    AddFaqComponent
  ],
  providers: [
    JobService,
    CountryService,
    CityService,
    PartnerService,
    StoryService,
    FAQService
  ],
})
export class SettingsModule { }

