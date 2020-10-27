
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class PartnerService {
    private controller: string = '/Partner';
    constructor(private webApi: WebApiService) { }
    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    Post(param) {
        return this.webApi.post(`${this.controller}/Post`, param);
    }
    Update(param) {
        return this.webApi.post(`${this.controller}/Update`, param);
    }
    Delete(ID){
        return this.webApi.delete(`${this.controller}/Delete/`+ID); 
    }
}