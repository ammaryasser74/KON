
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class SettingsQootService {
    private controller: string = '/Setting';
    constructor(private webApi: WebApiService) { }
    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    Update(param) {
        return this.webApi.post(`${this.controller}/Update`, param);
    }
}