import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ReportsService } from '../../../../services/reports/reports.service';
import { LanguageService } from '../../../../services/language.service';
import * as moment from 'moment-timezone';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'ngx-session-reservation-report',
  templateUrl: './session-reservation-report.component.html',
  styleUrls: ['./session-reservation-report.component.scss']
})
export class SessionReservationReportComponent implements OnInit {
  Data:any={};
  file:any;
  filepath:any;
  fileData=null;
  EndDate:any=null;
  StartDate:any=null;
  source: LocalDataSource = new LocalDataSource();

  pagingparamater = 
  {
  StartDate:null,
  EndDate:null,
  };

  dtOptions:any;
  loading:boolean=false;
  showpage:boolean=false;
  totalData:any;
  settings = {
    mode: 'external',
    hideSubHeader: true ,
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 10
    },
    columns: {

      client_name: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'اسم العميل':"client_name ",
        type: 'string',
      },
      coach_name: {
        title: this.languageService.getLanguageOrDefault()=='ar'?' اسم الكوتش':"coach_name",
        type: 'string',
      },
      code: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'الكود':"code ",
        type: 'string',
      },
      date: {
        title: this.languageService.getLanguageOrDefault()=='ar'?' التاريخ':"date",
        type: 'string',
      },
      name_arabic: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'الاسم':"name_arabic ",
        type: 'string',
      },
      status: {
        title: this.languageService.getLanguageOrDefault()=='ar'?'الحالة':"status",
        type: 'string',
      },
      time_from: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'الوقت من':"time_from ",
        type: 'string',
      },
      time_to: {
        title: this.languageService.getLanguageOrDefault()=='ar'?' الوقت ألي':"time_to",
        type: 'string',
      },
      total_price: {
        title: this.languageService.getLanguageOrDefault()=='ar'?' السعر':"total_price",
        type: 'string',
      },
      type: {
        title: this.languageService.getLanguageOrDefault()=='ar'?' النوع':"type",
        type: 'string',
      }
    },
    actions: {
      columnTitle: this.languageService.getLanguageOrDefault()=='ar'?' اجراءات':"Actions ",
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
  };
  constructor(private reportsService:ReportsService,
               private languageService:LanguageService) { }

  ngOnInit() {
    this.showpage=true
    this.reportsService.SessionReservationnData().subscribe(res=>{this.totalData=res.Data;
      this.showpage=false
      })
     this.getData();
  }
  
  getData(){
    debugger
    this.pagingparamater.StartDate=this.StartDate==null?null:moment(this.StartDate).format('YYYY-MM-DD'),
    this.pagingparamater.EndDate=this.EndDate==null?null:moment(this.EndDate).format('YYYY-MM-DD'),
    this.reportsService.SessionReservationnGetList(this.pagingparamater).subscribe(
      res => {
      
        this.Data=res
        let arr=[]
        this.Data.forEach(element => {
          let obj={
             client_name:element.Data.client_name,
             coach_name:element.Data.coach_name,
             code:element.Data.code,
             date:element.Data.date,

             name_arabic:element.Data.name_arabic,
             status:element.Data.status,

             time_from:element.Data.time_from,
             time_to:element.Data.time_to,
             total_price:element.Data.total_price,
             type:element.Data.type
          }
          arr.push(obj)
       });

        // console.log(res.Data,"lllllllllllllllllll");
        
        this.Data=arr
        
         this.source.load(arr);
         
        
      })
  }

  filter(filter: string) {
      if (filter.length) {
        const asd=(this.Data.filter(i => {
            let date =  i.date ;
            let visitors_count =  i.visitors_count;
            return `${date ? date.toLowerCase() : ''}
            ${visitors_count ? visitors_count.toLowerCase() : ''}
            `.indexOf(filter.toLowerCase()) !== -1;
          }))
          this.source.load(asd);
        }
        else{
          this.source.load(this.Data);
        }
  }

   Export() {
    this.reportsService.ExportSessionReservationn(this.pagingparamater).subscribe(res => {
      let path = res.Data;
      window.open(`${environment.api_img}${path}`);
    });
  }
 
}

