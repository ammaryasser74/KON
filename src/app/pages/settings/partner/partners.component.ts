
import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {SessionService} from '../../../../services/admin/session.service'
import { SmartTableData } from '../../../@core/data/smart-table';
import { LanguageService } from '../../../../services/language.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WarningComponent } from '../../warning/warning.component';

import { JobService } from '../../../../services/settings/job.service';

import { CountryService } from '../../../../services/settings/country.service';
import { AddPartnerComponent } from './add-partner/add-partner.component';
import { PartnerService } from '../../../../services/settings/partner.service';

@Component({
  selector: 'ngx-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
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
      name_arabic: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'الاسم بالعربي':"Name Arabic",
        type: 'string',
      },
      name_english: {
        title: this.languageService.getLanguageOrDefault()=='ar'?'الاسم بالانجليزي':"Name English",
        type: 'string',
      },
    },
    actions: {
      columnTitle: this.languageService.getLanguageOrDefault()=='ar'?' اجراءات':"Actions ",
      add: false,
      edit: true,
      delete: true,
      position: 'right',
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,
    private toastrService: NbToastrService,
    private modalService: BsModalService,
    private partnerService:PartnerService,
    private dialogService:NbDialogService,
    private languageService:LanguageService) {
  }

  onEdit(e){
    this.addEditaddressModel = this.modalService.show(AddPartnerComponent, { initialState:
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
        this.partnerService.Delete(event.data.id).subscribe(res=>{
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

  getData(){
    this.partnerService.GetList().subscribe(res=>{this.source.load(res.Data);this.Data=res.Data;;
    });
  }
  addNew() {
    this.addEditaddressModel = this.modalService.show(AddPartnerComponent, { initialState:
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
