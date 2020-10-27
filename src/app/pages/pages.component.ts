import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { LocalStorageService } from 'angular-2-local-storage';
import { LanguageService } from '../../services/language.service';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="myMenu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{
  myMenu:any[]=[]
  constructor(
      public localStorageService:LocalStorageService,
      private languageService:LanguageService,
  ) { }
  ngOnInit() {
    this.myMenu = this.localStorageService.get('permissions') as [];
    
    this.myMenu.map(i=>i.title=this.languageService.getLanguageOrDefault()=='ar'?i.name_ar:i.name_en)
  }
  
}
