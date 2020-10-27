
import { Injectable } from '@angular/core';
import { WebApiService } from "../webApi.service";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ReportsService {
    private controller: string = '/Report';
    constructor(private webApi: WebApiService) { }
    
   

    // Event
    GetListEvent(myparam) {
        return this.webApi.get(`${this.controller}/Event/GetList?StartDate=`+myparam.StartDate+'&EndDate='+myparam.EndDate);
    }
    GetListDataEvent(){
        return this.webApi.get(`${this.controller}/Event/Data`);
    }
    ExportEvent(myparam){
        return this.webApi.get(`${this.controller}/Event/Export?StartDate=`+myparam.StartDate+'&EndDate='+myparam.EndDate);
    }

    //coach 
     
    GetListCoach(myparam) {
        return this.webApi.get(`${this.controller}/Coach/GetList?StartDate=`+myparam.StartDate+'&EndDate='+myparam.EndDate);
    }
    GetListDataCoach(){
        return this.webApi.get(`${this.controller}/Coach/Data`);
    }
    ExportCoach(myparam){
        return this.webApi.get(`${this.controller}/Coach/Export?StartDate=`+myparam.StartDate+'&EndDate='+myparam.EndDate);
    }

    //client
    GetListClient(myparam) {
        return this.webApi.get(`${this.controller}/Client/GetList?StartDate=`+myparam.StartDate+'&EndDate='+myparam.EndDate);
    }
    GetListDataClient(){
        return this.webApi.get(`${this.controller}/Client/Data`);
    }
    ExportClient(myparam){
        return this.webApi.get(`${this.controller}/Client/Export?StartDate=`+myparam.StartDate+'&EndDate='+myparam.EndDate);
    }


VisitorData(){
    return this.webApi.get(`${this.controller}/Visitor/Data`);
}
VisitorGetList(myparam){
    return this.webApi.get(`${this.controller}/Visitor/GetList?StartDate=`+myparam.StartDate+'&EndDate='+myparam.EndDate);
}
ExportVisitor(myparam){
    return this.webApi.get(`${this.controller}/Visitor/Export?StartDate=`+myparam.StartDate+'&EndDate='+myparam.EndDate);
}
  
  
EventReservationData(){
    return this.webApi.get(`${this.controller}/EventReservation/Data`);
}
EventReservationGetList(myparam){
    return this.webApi.get(`${this.controller}/EventReservation/GetList?StartDate=`+myparam.StartDate+'&EndDate='+myparam.EndDate);
}
ExportEventReservation(myparam){
    return this.webApi.get(`${this.controller}/EventReservation/Export?StartDate=`+myparam.StartDate+'&EndDate='+myparam.EndDate);
}
 
SessionReservationnData(){
    return this.webApi.get(`${this.controller}/SessionReservation/Data`);
}
SessionReservationnGetList(myparam){
    return this.webApi.get(`${this.controller}/SessionReservation/GetList?StartDate=`+myparam.StartDate+'&EndDate='+myparam.EndDate+'&page='+myparam.current_page+'&per_page='+myparam.per_page+'&orderBy='+myparam.orderBy+'&isAscending='+myparam.isAscending);
}
ExportSessionReservationn(myparam){
    return this.webApi.get(`${this.controller}/SessionReservation/Export?StartDate=`+myparam.StartDate+'&EndDate='+myparam.EndDate+'&page='+myparam.current_page+'&per_page='+myparam.per_page+'&orderBy='+myparam.orderBy+'&isAscending='+myparam.isAscending);
}
  
}