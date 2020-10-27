import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbLayoutDirection, NbLayoutDirectionService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService, StateService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LanguageService } from '../../../../services/language.service';
import { AuthService } from '../../../../services/user/auth.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile',link:'/admin/show-profile/'+this.authService.currentUser.id }, { title: 'Log out' ,link:'/login'} ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private  directionService: NbLayoutDirectionService,
              private themeService: NbThemeService,
              private stateService:StateService,
              public languageService: LanguageService,
              private userService: UserData,
              private layoutService: LayoutService,
              public authService:AuthService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {
  
    
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
      if(this.languageService.getLanguageOrDefault()=="ar"){
        this.directionService.setDirection(NbLayoutDirection.RTL)
  
    }
      else{
        this.directionService.setDirection(NbLayoutDirection.LTR)
      }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  translate(lang){
    if(lang=="LTR"){
      this.languageService.setLanguage('ar')
      this.directionService.setDirection(NbLayoutDirection.RTL)
      
    }
    else{
      this.languageService.setLanguage('en')
      this.directionService.setDirection(NbLayoutDirection.LTR)
    }
   
  }
  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
