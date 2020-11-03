
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class PackagesService {
    private controller: string = '/Package';
    constructor(private webApi: WebApiService) { }
    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    Delete(ID) {
        return this.webApi.delete(`${this.controller}/Delete/` + ID);
    }

    showById(id) {
        return this.webApi.get(`${this.controller}/GetByID/` + id);
    }

    Post(param) {
        return this.webApi.post(`${this.controller}/Post`, param);
    }
    Update(param) {
        return this.webApi.post(`${this.controller}/Update`, param);
    }
    Days() {
        return this.webApi.get(`/Day/GetList`);
    }

}