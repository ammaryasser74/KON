import { NgModule } from '@angular/core';
import { NbMenuModule, NbButtonModule, NbCheckboxModule, NbTreeGridModule, NbRadioModule, NbDatepickerModule, NbIconModule, NbSelectComponent, NbSelectModule, NbInputModule, } from '@nebular/theme';
import {  PaginationModule, BsDropdownModule, ModalModule, BsLocaleService} from 'ngx-bootstrap';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
// import { enGbLocale, arLocale } from 'ngx-bootstrap/locale';
import { WebApiService } from '../../services/webApi.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { WarningModule } from './warning/warning.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// defineLocale('en', enGbLocale);
// defineLocale('ar', arLocale);

@NgModule({
  imports: [
    PagesRoutingModule,
    ToasterModule,
    NbButtonModule,
    WarningModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ThemeModule,
    ModalModule.forRoot(),
    NbMenuModule,
    NbSelectModule,
    DashboardModule,
    BsDropdownModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    NbIconModule,

  ],
  declarations: [
    PagesComponent,
  ],
  entryComponents:[],
  exports:[
  PaginationModule,
  NgSelectModule,
  NbButtonModule,
  WarningModule,
  NbTreeGridModule,
  ModalModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
  NbSelectModule,
  BsDropdownModule,
  Ng2SmartTableModule,
  NbIconModule,
  NbInputModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,

],
  providers: [
    WebApiService,
    TranslateService,
    LanguageService,
  ]
})
export class PagesModule {
  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
    //private localeService: BsLocaleService,
    // private bsDatepickerConfig: BsDatepickerConfig
  ) {
    this.translateService.use(this.languageService.getLanguageOrDefault());
    // this.bsDatepickerConfig.dateInputFormat = environment.defaultDateFormat;
    // this.bsDatepickerConfig.containerClass = 'theme-dark-blue';
  }
}
