import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/map';
import { catchError, retry, tap, map,filter } from 'rxjs/operators';

import { Router } from '@angular/router';
//import { AuthService } from './user/auth.service';

export enum MenuActions {
  Action = 'subLayout',
  New = 'new',
  Save = 'save',
  discount = 'discount',
  Delete = 'delete',
  Refresh = 'refresh',
  Cancel = 'cancel',
  Post = 'post',
  Posted = 'posted',
  Print = 'print',
  EasyPrint= 'easy-print',
}
export enum GridActions {
  Action = 'loading',
  Loaded = 0,
  Loading = 1,
  Empety = 2
}
interface BroadcastEvent {
  key: any;
  data?: any;
}

@Injectable()
export class SubLayoutService {

  private event: Subject<BroadcastEvent>;
  private keys: String[] = [];
  constructor(
    //private authService: AuthService,
    private router: Router
  ) {
    this.event = new Subject<BroadcastEvent>();
  }
  broadcast(key: any, data?: any) {
    this.event.next({ key, data });
  }
  on<T>(key: any, keys?: String[]): Observable<T> {
    this.keys = keys;
    return this.event.asObservable()
    .pipe(filter(event => event.key === key)).pipe(map(event => <T>event.data));
  }
  get getKeys(): String[] {
    return this.keys || [];
  }
  addKeys(keys: String[]) {
    keys.forEach(key => {
      if (!this.keys.includes(key))
        this.keys.push(key);
    });
  }
  removeKey(keys: String[]) {
    keys.forEach(key => {
      let keyIndex = this.keys.indexOf(key);
      if (keyIndex !== -1)
        this.keys.splice(keyIndex, 1);
    })
  }
  hasPermission(MenuAction): boolean {
    let moduleURL = this.router.url.split('/')[1];
    let resourceURL = this.router.url.split('/')[2];
    let _module;
    let resource;
    // if (this.authService.roles && this.authService.roles.length) {
    //   _module = this.authService.roles.find(i => i.Url == moduleURL);
    //   if (_module.Resources && _module.Resources.length) {
    //     resource = _module.Resources.find(i => i.Url == resourceURL);
    //     if (resource && resource.Permissions && resource.Permissions.length) {
    //       return resource.Permissions.findIndex(i => i.ID === PermissionsMap.find(i => i.MenuAction === MenuAction).ID) !== -1;
    //     } else {
    //       this.router.navigate([_module.Url, _module.Resources[0].Url])
    //     }
    //   } else {
    //     return false;
    //   }
    // } else {
    //   return false;
    // }
    return false;
  }
}
export const PermissionsMap = [
	// {ID:1,MenuAction:MenuActions.Save},
	{ ID: 2, MenuAction: MenuActions.New },
	{ ID: 3, MenuAction: MenuActions.Save },
	{ ID: 4, MenuAction: MenuActions.Delete },
	{ ID: 5, MenuAction: MenuActions.Post },
	{ ID: 6, MenuAction: MenuActions.Print },
]