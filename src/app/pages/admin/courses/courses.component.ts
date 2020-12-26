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
import { map, takeWhile } from 'rxjs/operators';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { CoursesService } from '../../../../services/admin/courses.service';
@Component({
  selector: 'ngx-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
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
      price: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'السعر' : "Price",
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
    private coursesService: CoursesService,
    private dialogService: NbDialogService,
    private languageService: LanguageService) {
  }


  ngOnInit() {
    this.getData();
  }

  onEdit(e) {
    this.addEditaddressModel = this.modalService.show(AddCoursesComponent, {
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
        this.coursesService.Delete(event.data.id).pipe(takeWhile(() => this.alive)).subscribe(res => {
          if (res['Success']) {
            this.warningModel.hide();
            this.toastrService.success(res['Message'], "success");
            this.getData()
          }
          else {
            this.toastrService.danger(res['Message'], "Error");
          }
        })
      }
    };
  }

  getData() {
    this.coursesService.GetList().pipe(takeWhile(() => this.alive)
    ).subscribe(res => {
      this.source.load(res['Data']);
      this.Data = res['Data'];;
    });
  }
  addNew() {
    this.addEditaddressModel = this.modalService.show(AddCoursesComponent, {
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
        let price = i.price;
        let coach = i.coach_name;
        return `${name_arabic ? name_arabic.toLowerCase() : ''}
        ${name_english ? name_english.toLowerCase() : ''}
          ${price ? price.toLowerCase() : ''}
          ${coach ? coach.toLowerCase() : ''}
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
