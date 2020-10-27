
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CategoryService {
    private controller: string = '/Setting/Category';
    constructor(private webApi: WebApiService) { }
    GetList(myparam) {
        return this.webApi.get(`${this.controller}/GetList?page=`+myparam.current_page+'&orderBy='+myparam.orderBy+'&isAscending='+myparam.isAscending+'&per_page='+myparam.per_page+'&sortBy='+myparam.sortBy+'&name='+myparam.name);
    }
    Delete(ID){
        return this.webApi.get(`${this.controller}/Delete/`+ID); 
    }
    Post(param) {
        return this.webApi.post(`${this.controller}/Post`, param);
    }
    Update(param) {
        return this.webApi.post(`${this.controller}/Update`, param);
    }
   
}