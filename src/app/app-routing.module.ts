import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/home/home.module#HomeModule',
  },

  {
    path: 'settings',
    loadChildren: 'app/pages/settings/settings.module#SettingsModule',
   
  },
  {
    path: 'admin',
    loadChildren: 'app/pages/admin/admin.module#AdminModule',
  }
  ,
  {
    path: 'reports',
    loadChildren: 'app/pages/reports/reports.module#ReportsModule',
  },
 
  
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  }
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
