
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class RolesService {
    private controller: string = '/Role';
    constructor(private webApi: WebApiService) { }
    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    Delete(ID){
        return this.webApi.delete(`${this.controller}/Delete/`+ID); 
    }
    Permission(){
        return this.webApi.get(`${this.controller}/Permission`);  
    }
    Post(param) {
        return this.webApi.post(`${this.controller}/Post`, param);
    }
    Update(param) {
        return this.webApi.post(`${this.controller}/Update`, param);
    }
    GetByID(CustomerID){
        return this.webApi.get(`${this.controller}/GetByID/`+CustomerID)
    }
    ChangePassword(myparam) {
        return this.webApi.post(`/ChangePassword`, myparam);
    }
}