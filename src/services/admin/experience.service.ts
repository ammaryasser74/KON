
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ExperienceService {
    private controller: string = '/Experience';
    constructor(private webApi: WebApiService) { }
    
    Post(myparam) {
        return this.webApi.post(`${this.controller}/Post`, myparam);
    }
    update(myparam) {
        return this.webApi.post(`${this.controller}/Update`, myparam);
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