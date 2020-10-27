
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class EventService {
    private controller: string = '/Event';
    constructor(private webApi: WebApiService) { }
    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    Delete(ID){
        return this.webApi.delete(`${this.controller}/Delete/`+ID); 
    }
  
    Post(param) {
        return this.webApi.post(`${this.controller}/Post`, param);
    }
    GetByID(ID){
        return this.webApi.get(`${this.controller}/GetByID/`+ID); 
    }
    Update(param) {
        return this.webApi.post(`${this.controller}/Update`, param);
    }
    Export() {
        return this.webApi.get(`${this.controller}/Export`);
    }
    eventnotClosed() {
        return this.webApi.get(`${this.controller}/Open`);
    }
}