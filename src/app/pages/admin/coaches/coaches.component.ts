import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {SessionService} from '../../../../services/admin/session.service'
import { SmartTableData } from '../../../@core/data/smart-table';
import { LanguageService } from '../../../../services/language.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WarningComponent } from '../../warning/warning.component';
import { EventService } from '../../../../services/admin/event.service';
import { AddCoachComponent } from './add-coach/add-coach.component';
import { CoachService } from '../../../../services/admin/coaches.service';
import { ButtonRenderShowProfileComponent } from './button.render.component';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'ngx-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss']
})
export class CoachesComponent implements OnInit {
  name='';
  Data:any;
  addEditaddressModel: BsModalRef;
  warningModel: BsModalRef;
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
        title:this.languageService.getLanguageOrDefault()=='ar'?'الأسم الأول':"First Name ",
        type: 'string',
      },
      last_name: {
        title: this.languageService.getLanguageOrDefault()=='ar'?'الأسم الاخير':"Last Name ",
        type: 'string',
      },
      phone: {
        title:this.languageService.getLanguageOrDefault()=='ar'?' رقم الجوال':"Phone ",
        type: 'string',
      },
      email: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'البريد الألكتروني':"Email ",
        type: 'string',
      },
      id: {
        title: this.languageService.getLanguageOrDefault()=='ar'?'الملف الشخصي':"show profile ",
        type: 'custom',
        renderComponent: ButtonRenderShowProfileComponent,
        defaultValue: 'asd'
      },
    },
    actions: {
      columnTitle: this.languageService.getLanguageOrDefault()=='ar'?' اجراءات':"Actions ",
      add: false,
      edit: false,
      delete: true,
      position: 'right',
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,
    private toastrService: NbToastrService,
    private modalService: BsModalService,
    private coachService:CoachService,
    private dialogService:NbDialogService,
    private languageService:LanguageService) {
  }

  onEdit(e){
    this.addEditaddressModel = this.modalService.show(AddCoachComponent, { initialState:
      {Data: e.data, }, class: 'modal-lg',backdrop: 'static' });
      this.addEditaddressModel.content.onClose  = (res) => {
       this.getData()
      };
  }

  onDeleteConfirm(event): void {
    this.warningModel = this.modalService.show(WarningComponent, { class: 'modal-sm' });
    this.warningModel.content.boxObj.msg = this.languageService.getLanguageOrDefault()=='ar'?'انت متاكد من الحذف ؟':'Are you sure you want to delete this  ?';;
    this.warningModel.content.onClose = (cancel) => {
      if (cancel) {
        this.coachService.Delete(event.data.id).subscribe(res=>{
          if(res.Success){
            this.warningModel.hide();
            this.toastrService.success(res.Message,"success");
            this.getData()
          }
          else{
            this.toastrService.danger(res.Message,"Error");
          }
        })
      }
    };
  }
  Export() {
    this.coachService.Export().subscribe(res => {
      let path = res.Data;
      window.open(`${environment.api_img}${path}`);
    });
  }
  getData(){
    this.coachService.GetList().subscribe(res=>{this.source.load(res.Data);this.Data=res.Data;;
    });
  }
  addNew() {
    this.addEditaddressModel = this.modalService.show(AddCoachComponent, { initialState:
      {Data: null, }, class: 'modal-lg',backdrop: 'static' });
      this.addEditaddressModel.content.onClose  = (res) => {
       this.getData()
      };
  }


  filter(filter: string) {
    if (filter.length) {
      const asd=(this.Data.filter(i => {
          let name_arabic =  i.name_arabic ;
          let description_arabic =  i.description_arabic;
          let name_english =   i.name_english ;
          let description_eglish =  i.description_eglish;

          return `${name_arabic ? name_arabic.toLowerCase() : ''}
          ${description_arabic ? description_arabic.toLowerCase() : ''}
          ${name_english ? name_english.toLowerCase() : ''}
          ${description_eglish ? description_eglish.toLowerCase() : ''}

          `.indexOf(filter.toLowerCase()) !== -1;
        }))
        this.source.load(asd);
      }
      else{
        this.source.load(this.Data);
      }
  }
  ngOnInit(){
    this.getData();
  }
}
