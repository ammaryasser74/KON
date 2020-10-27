
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ChildService {
    private controller: string = '/Child';
    constructor(private webApi: WebApiService) { }
    
    Post(myparam) {
        return this.webApi.post(`${this.controller}/Post`, myparam);
    }
    Update(myparam) {
        return this.webApi.post(`${this.controller}/Update`, myparam);
    }
    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    
    Delete(ID){
        return this.webApi.delete(`${this.controller}/Delete/`+ID); 
    }
    GetByID(ID){
        return this.webApi.get(`${this.controller}/GetByID/`+ID); 
    }
    Login(myparam){
        return this.webApi.post(`${this.controller}/Employee/Login`, myparam);
    }
   
}