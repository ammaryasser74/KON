import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PackagesService } from '../../../../services/admin/packages.service'
import { SmartTableData } from '../../../@core/data/smart-table';
import { LanguageService } from '../../../../services/language.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Title } from '@angular/platform-browser';
import { WarningComponent } from '../../warning/warning.component';
import { AddPackagesComponent } from './add-packages/add-packages.component';
import { map, takeWhile } from 'rxjs/operators';
@Component({
  selector: 'ngx-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit, OnDestroy {
  name = '';
  Data: any;
  addEditaddressModel: BsModalRef;
  warningModel: BsModalRef;
  settings = {
    mode: 'external',
    hideSubHeader: true,
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
    noDataMessage: this.languageService.getLanguageOrDefault() == 'ar' ? 'لا توجد بيانات' : "No data found",
    columns: {
      name_arabic: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'الاسم بالعربي' : "Name Arabic",
        type: 'string',
      },
      name_english: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'الاسم بالانجليزي' : "Name English",
        type: 'string',
      },
      coach_name: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'اسم المدرب' : "Coach Name ",
        type: 'string',
      },
      session_name_arabic: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'اسم الجلسة باللغة العربية' : "Session Name Arabic ",
        type: 'string',
      },
      session_name_english: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'اسم الجلسة باللغة الانجليزية' : "Session Name English ",
        type: 'string',
      },
      no_of_session: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'عدد الحصص' : "Sessions Number  ",
        type: 'string',
      },
      normal_price: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'السعر الطبيعي ' : "Normal Price",
        type: 'string',
      },
      package_price: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'سعر الباقة ' : " Package Price",
        type: 'string',
      }
    },
    actions: {
      columnTitle: this.languageService.getLanguageOrDefault() == 'ar' ? ' اجراءات' : "Actions ",
      add: false,
      edit: true,
      delete: true,
      position: 'right',
    },
  };

  source: LocalDataSource = new LocalDataSource();
  alive: boolean = true;
  constructor(private service: SmartTableData,
    private toastrService: NbToastrService,
    private modalService: BsModalService,
    private PackagesService: PackagesService,
    private dialogService: NbDialogService,
    private languageService: LanguageService) {
  }


  ngOnInit() {
    this.getData();
  }

  onEdit(e) {
    this.addEditaddressModel = this.modalService.show(AddPackagesComponent, {
      initialState:
        { Data: e.data, }, class: 'modal-lg', backdrop: 'static'
    });
    this.addEditaddressModel.content.onClose = (res) => {
      this.getData()
    };
  }

  onDeleteConfirm(event): void {
    this.warningModel = this.modalService.show(WarningComponent, { class: 'modal-md' });
    this.warningModel.content.boxObj.msg = this.languageService.getLanguageOrDefault() == 'ar' ? 'انت متاكد من الحذف ؟' : 'Are you sure you want to delete this  ?';;
    this.warningModel.content.onClose = (cancel) => {      
      if (cancel) {
        this.PackagesService.Delete(event.data.id).pipe(takeWhile(() => this.alive)).subscribe(res => {
          if (res['success']) {
            this.warningModel.hide();
            this.toastrService.success(res['message'], "success");
            this.getData()
          }
          else {
            this.toastrService.danger(res['message'], "Error");
          }
        })
      }
    };
  }

  getData() {
    this.PackagesService.GetList().pipe(takeWhile(() => this.alive),
      map(d => {
        d['data'].forEach(e => {
          e['session_name_arabic'] = e['session']['name_arabic']
          e['session_name_english'] = e['session']['name_english']
        });

        return d
      })
    ).subscribe(res => {
      this.source.load(res['data']);
      this.Data = res['data'];;
    });
  }
  addNew() {
    this.addEditaddressModel = this.modalService.show(AddPackagesComponent, {
      initialState:
        { Data: null, }, class: 'modal-lg', backdrop: 'static'
    });
    this.addEditaddressModel.content.onClose = (res) => {
      this.getData()
    };
  }


  filter(filter: string) {
    if (filter.length) {
      const data = (this.Data.filter(i => {
        let name_arabic = i.name_arabic;
        let name_english = i.name_english;
        let normal_price = i.normal_price;
        let coach = i.coach_name;
        let package_price = i.package_price;
        let no_of_session = i.no_of_session.toString();
        return `${name_arabic ? name_arabic.toLowerCase() : ''}
        ${name_english ? name_english.toLowerCase() : ''}
          ${normal_price ? normal_price.toLowerCase() : ''}
          ${coach ? coach.toLowerCase() : ''}
          ${package_price ? package_price.toLowerCase() : ''}
          ${no_of_session ? no_of_session.toLowerCase() : ''}
          `.indexOf(filter.toLowerCase()) !== -1;
      }))
      this.source.load(data);
    }
    else {
      this.source.load(this.Data);
    }
  }

  ngOnDestroy() {
    this.alive = false
  }
}
