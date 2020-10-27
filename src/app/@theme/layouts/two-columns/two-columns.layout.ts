import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'ngx-two-columns-layout',
  styleUrls: ['./two-columns.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed asd>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="small">
      </nb-layout-column>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>

    </nb-layout>
  `,
})
export class TwoColumnsLayoutComponent { 
   mymenu:[]
  constructor(
    public localStorageService:LocalStorageService) {
  }
  getFromLocalStorage(key: string) {
    return this.localStorageService.get(key) as any;
  }
  ngOnInit(){
    this.mymenu=this.getFromLocalStorage('permissions') as []
  }}
