import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LanguageService } from '../../../../services/language.service';
import { ReportsService } from '../../../../services/reports/reports.service';
import * as moment from 'moment-timezone';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'ngx-visitor-report',
  templateUrl: './visitor-report.component.html',
  styleUrls: ['./visitor-report.component.scss']
})
export class VisitorReportComponent implements OnInit {
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
      date: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'التاريخ':"Date ",
        type: 'string',
      },
      visitors_count: {
        title: this.languageService.getLanguageOrDefault()=='ar'?'عدد الزوار':"No of visitor ",
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
    this.reportsService.VisitorData().subscribe(res=>{this.totalData=res.Data;
      this.showpage=false
      })
     this.getData();
  }
  
  getData(){
    this.pagingparamater.StartDate=this.StartDate==null?null:moment(this.StartDate).format('YYYY-MM-DD'),
    this.pagingparamater.EndDate=this.EndDate==null?null:moment(this.EndDate).format('YYYY-MM-DD'),
    this.reportsService.VisitorGetList(this.pagingparamater).subscribe(
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
    this.reportsService.ExportVisitor(this.pagingparamater).subscribe(res => {
      let path = res.Data;
      window.open(`${environment.api_img}${path}`);
    });
  }
 
}

