
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class DashBoardService {
    private controller: string = '/DashBoard';
    constructor(private webApi: WebApiService) { }

    CalendarReservation(date) {
        return this.webApi.post(`${this.controller}/CalendarReservation`,date);
    }
    NewReservation() {
        return this.webApi.get(`${this.controller}/NewReservation`);
    }
    TotalData() {
        return this.webApi.get(`${this.controller}/TotalData`);
    }
}