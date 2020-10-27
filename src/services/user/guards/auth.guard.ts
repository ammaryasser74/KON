import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.currentUser!=null) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  
}