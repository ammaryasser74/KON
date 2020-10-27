import { Injectable, HostListener } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpParams } from '@angular/common/http';
export interface Product { ID: number, ItemID: number, Description: string, Price: number }

export interface User { UserName: string, Password: string };
//export interface ChangedPassword{ID:number,EmployeeID:number,IsPasswordUpdated:boolean,Password:string}
export interface FilterObj {
    pageSize?: any,
    fromDate?: any,
    toDate?: any
    name?: string,
    orderBy?: string,
    isAscending?: boolean,
    pageIndex?: number,

};
@Injectable()
export class AuthService {
	private controller: string = '/Employee';

	constructor(
		private webApi: WebApiService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private localStorageService: LocalStorageService,
	) { }
	get currentUser() {
		if (this.localStorageService.get('currentUser'))
		return this.localStorageService.get('currentUser') as any;
	}
	
	get accessToken() {
		if (this.localStorageService.get('accessToken'))
			return this.localStorageService.get('accessToken') as string;
	}
	Login(param) {
        return this.webApi.post(`/Login`, param);
    }

	LogOut(cb?: any) {
		
		this.router.navigate(['/login']);
		return this.webApi.get(`/Logout/`+(this.currentUser.id)).subscribe(res => {
			this.localStorageService.clearAll();
			if (res.Success) {
			}
			window.location.reload();
			cb && cb(res);
		});
	}
	
	isLoggedIn(): boolean {
		return !(!this.accessToken);
	}

	Search(filterObj: FilterObj) {
        return this.webApi.get(`${this.controller}/GetAllEmployees`,
			Object.getOwnPropertyNames(filterObj).reduce((p, key) => p.set(key, filterObj[key].toString()),
			 new HttpParams().set('pageSize', '10')));
    
        }
    GetByID(id: string) {
        
        return this.webApi.get(`${this.controller}/GetByID/${id}`);
    }
    GetList() {
      
        return this.webApi.get(`${this.controller}/GetAllEmployees`);
    }
    Post(category: Product) {
        return this.webApi.post(`${this.controller}/Post`, category);
    }
    Put(category: Product) {
        return this.webApi.put(`${this.controller}/Put`, category);
    }
    Delete(id: number) {
        return this.webApi.delete(`${this.controller}/Delete/${id}`);
    }
}
