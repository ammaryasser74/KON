
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CustomersService {
    private controller: string = '/Customer';
    constructor(private webApi: WebApiService) { }
    GetList(myparam) {
        return this.webApi.get(`${this.controller}/GetList?page=`+myparam.current_page+'&orderBy='+myparam.orderBy+'&isAscending='+myparam.isAscending+'&per_page='+myparam.per_page+'&sortBy='+myparam.sortBy+'&name='+myparam.name);
    }

    GetListData(){
        return this.webApi.get(`${this.controller}/Data`);
    }
    GetByID(CustomerID){
        return this.webApi.get(`${this.controller}/GetByID/`+CustomerID)
    }
    Export(){
        return this.webApi.get(`${this.controller}/Export`) ;
    }
    Block(CustomerID){
        return this.webApi.get(`${this.controller}/Block/`+CustomerID); 
    }
}