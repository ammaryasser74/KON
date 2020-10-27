
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AboutUSService {
    private controller: string = '/Setting/AboutUS';
    constructor(private webApi: WebApiService) { }
    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    Update(param) {
        return this.webApi.post(`${this.controller}/Update`, param);
    }
}