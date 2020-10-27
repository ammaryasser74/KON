import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ReportsService } from '../../../../services/reports/reports.service';
import { LanguageService } from '../../../../services/language.service';
import * as moment from 'moment-timezone';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'ngx-coach-report',
  templateUrl: './coach-report.component.html',
  styleUrls: ['./coach-report.component.scss']
})
export class CoachReportComponent implements OnInit {
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
      first_name: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'الاسم الاول':"First Name ",
        type: 'string',
      },
      last_name: {
        title: this.languageService.getLanguageOrDefault()=='ar'?'الاسم الاخير':"Last Name",
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
      city: {
        title: this.languageService.getLanguageOrDefault()=='ar'?'المدينة ':" City  ",
        type: 'string',
      },
      all_reservations: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'مجموع الحجوزات':"all reservationshone ",
        type: 'string',
      },
      total_price: {
        title: this.languageService.getLanguageOrDefault()=='ar'?' السعر':"total_price ",
        type: 'string',
      },
      upcoming_session: {
        title: this.languageService.getLanguageOrDefault()=='ar'?' الحجوزات القادمة':" upcoming session  ",
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
    // this.reportsService.GetListDataClient().subscribe(res=>{this.totalData=res.Data;
    //   this.showpage=false
    //   })
     this.getData();
  }
  
  getData(){
    this.pagingparamater.StartDate=this.StartDate==null?null:moment(this.StartDate).format('YYYY-MM-DD'),
    this.pagingparamater.EndDate=this.EndDate==null?null:moment(this.EndDate).format('YYYY-MM-DD'),
    this.reportsService.GetListCoach(this.pagingparamater).subscribe(
      res => {
        if (res.Success) {
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
    this.reportsService.ExportCoach(this.pagingparamater).subscribe(res => {
      let path = res.Data;
      window.open(`${environment.api_img}${path}`);
    });
  }
 
}

