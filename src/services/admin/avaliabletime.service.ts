
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class TimeService {
    private controller: string = '/Time';
    constructor(private webApi: WebApiService) { }
    
    Post(myparam) {
        return this.webApi.post(`${this.controller}/Post`, myparam);
    }

    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    
    Delete(id){
        return this.webApi.delete(`${this.controller}/Delete/`+id); 
    }
    GetByID(ID){
        return this.webApi.get(`${this.controller}/GetByID/`+ID); 
    }

   
}