
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class DishesService {
    private controller: string = '/Dish';
    constructor(private webApi: WebApiService) { }

    GetList(myparam) {
        return this.webApi.get(`${this.controller}/GetList?page=`+myparam.current_page+'&orderBy='+myparam.orderBy+'&isAscending='+myparam.isAscending+'&per_page='+myparam.per_page+'&sortBy='+myparam.sortBy+'&name='+myparam.name);
    }
    Export(){
        return this.webApi.get(`${this.controller}/Export`) ;
    }
    GetListData(){
        return this.webApi.get(`${this.controller}/Data`);
    }
    GetByID(chiefID){
        return this.webApi.get(`${this.controller}/GetByID/`+chiefID)
    }
    Approve(ChiefID){
        return this.webApi.get(`${this.controller}/Approve/`+ChiefID); 
    }

}