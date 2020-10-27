import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ReportsService } from '../../../../services/reports/reports.service';
import { LanguageService } from '../../../../services/language.service';
import * as moment from 'moment-timezone';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'ngx-event-report',
  templateUrl: './event-report.component.html',
  styleUrls: ['./event-report.component.scss']
})
export class EventReportComponent implements OnInit {
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
    columns:{
      name_arabic: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'اسم الايفينت':"Event Name  ",
        type: 'string',
      },
      coach_name: {
        title:this.languageService.getLanguageOrDefault()=='ar'?' اسم المدرب':"Coach Name ",
        type: 'string',
      },
      phone: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'الجوال':"Phone ",
        type: 'string',
      },
      email: {
        title: this.languageService.getLanguageOrDefault()=='ar'?' البريد الالكتروني':"ُEmail ",
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
      price: {
        title: this.languageService.getLanguageOrDefault()=='ar'?' السعر':"total_price",
        type: 'string',
      },
      no_reserve: {
        title: this.languageService.getLanguageOrDefault()=='ar'?' عدد الحجوزات':"no_reserve",
        type: 'string',
      },
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
    // this.reportsService.GetListDataClient().subscribe(res=>{this.totalData=res.Data;
    //   this.showpage=false
    //   })
     this.getData();
  }
  
  getData(){
    this.pagingparamater.StartDate=this.StartDate==null?null:moment(this.StartDate).format('YYYY-MM-DD'),
    this.pagingparamater.EndDate=this.EndDate==null?null:moment(this.EndDate).format('YYYY-MM-DD'),
    this.reportsService.GetListEvent(this.pagingparamater).subscribe(
      res => {
        if (res.Success) {
          res.Data.map(i=>i.coach_name=i.first_name+' '+i.last_name)
         this.Data = res.Data;
         this.source.load(res.Data);
         
        }
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
    this.reportsService.ExportEvent(this.pagingparamater).subscribe(res => {
      let path = res.Data;
      window.open(`${environment.api_img}${path}`);
    });
  }
 
}

