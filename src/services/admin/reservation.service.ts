
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ReservationService {
    private controller: string = '/Reservation';
    constructor(private webApi: WebApiService) { }
    
    Post(myparam) {
        return this.webApi.post(`${this.controller}/Post`, myparam);
    }
    Update(myparam) {
        return this.webApi.post(`${this.controller}/Update`, myparam);
    }
    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    GetListTime(date,coach_id) {
        return this.webApi.get(`/Time/GetList?date=${date}&coach_id=${coach_id}`);
    }
    UpdateTime(myParam) {
        return this.webApi.post(`${this.controller}/UpdateTime`, myParam);
    }
    Delete(ID){
        return this.webApi.delete(`${this.controller}/Delete/`+ID); 
    }
    GetByID(ID){
        return this.webApi.get(`${this.controller}/GetByID/`+ID); 
    }
    Login(myparam){
        return this.webApi.post(`${this.controller}/Employee/Login`, myparam);
    }
    Time(myParam) {
        return this.webApi.post(`${this.controller}/Time`, myParam);
    }

    Export() {
        return this.webApi.get(`${this.controller}/Export?Type=Session`);
    }
    ExportEvent() {
        return this.webApi.get(`${this.controller}/Export?Type=Event`);
    }
}