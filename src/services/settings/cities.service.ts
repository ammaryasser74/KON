
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CityService {
    private controller: string = '/City';
    constructor(private webApi: WebApiService) { }
    GetList(ID) {
        return this.webApi.get(`${this.controller}/GetList/`+ID);
    }
    Getall() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    Post(param) {
        return this.webApi.post(`${this.controller}/Post`, param);
    }
    Update(param) {
        return this.webApi.post(`${this.controller}/Update`, param);
    }
    Delete(ID){
        return this.webApi.get(`${this.controller}/Delete/`+ID); 
    }
}