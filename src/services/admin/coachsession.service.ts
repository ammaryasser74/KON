
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CoachSessionService {
    private controller: string = '/CoachSession';
    constructor(private webApi: WebApiService) { }
    
    Post(myparam) {
        return this.webApi.post(`${this.controller}/Post`, myparam);
    }

    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    
    Delete(myparam){
        return this.webApi.post(`${this.controller}/Delete`,myparam); 
    }
    GetByID(ID){
        return this.webApi.get(`${this.controller}/GetByID/`+ID); 
    }

   
}