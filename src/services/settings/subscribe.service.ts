
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class SubscribeService {
    private controller: string = '/Setting/Subscribe';
    constructor(private webApi: WebApiService) { }
    GetList(myparam) {
        return this.webApi.get(`${this.controller}/GetList?page=`+myparam.current_page+'&orderBy='+myparam.orderBy+'&isAscending='+myparam.isAscending+'&per_page='+myparam.per_page+'&sortBy='+myparam.sortBy+'&name='+myparam.name);
    }
}