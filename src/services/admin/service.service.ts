
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ServiceService {
    private controller: string = '/Service';
    constructor(private webApi: WebApiService) { }
    GetTree() {
        return this.webApi.get(`${this.controller}/GetTree`);
    }
    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    Delete(ID){
        return this.webApi.delete(`${this.controller}/Delete/`+ID); 
    }
  
    Post(param) {
        return this.webApi.post(`${this.controller}/Post`, param);
    }
    Update(param) {
        return this.webApi.post(`${this.controller}/Update`, param);
    }
    Session(id) {
        return this.webApi.get(`${this.controller}/Session/${id}`);
    }

}