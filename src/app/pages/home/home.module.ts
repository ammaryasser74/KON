import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from './login/login.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/user/auth.service';
import { AppModule } from '../../app.module';
import { PagesModule } from '../pages.module';
import { NbToastrService, NbCardModule, NbToastrModule, NbAlertModule } from '@nebular/theme';
import { ToasterModule } from 'angular2-toaster';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/login/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToasterModule.forRoot(),
    NbCardModule,
    NbAlertModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports:[FormsModule,ReactiveFormsModule, NbCardModule,ToasterModule,NbAlertModule],
  providers: [
    AuthService,
    NbToastrService,
  ],
  declarations: [LoginComponent]
})
export class HomeModule { }
