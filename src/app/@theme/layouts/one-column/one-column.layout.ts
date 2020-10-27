

import {Component, OnInit} from '@angular/core';
import {NbLayoutDirection, NbLayoutDirectionService} from "@nebular/theme";
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar [ngClass]="sidebar_class" tag="menu-sidebar"  responsive >
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent implements OnInit {
  mymenu:[]
  constructor(private  directionService: NbLayoutDirectionService,
    public localStorageService:LocalStorageService) {
  }
  getFromLocalStorage(key: string) {
    return this.localStorageService.get(key) as any;
  }
  ngOnInit(){
    this.mymenu=this.getFromLocalStorage('permissions') as []
  }

  layout_direction: NbLayoutDirection = this.directionService.getDirection();
  sidebar_class: string = 'menu-sidebar';
}
