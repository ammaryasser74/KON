
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SessionService } from '../../../../services/admin/session.service'
import { SmartTableData } from '../../../@core/data/smart-table';
import { LanguageService } from '../../../../services/language.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WarningComponent } from '../../warning/warning.component';

import { EventService } from '../../../../services/admin/event.service';
import { ReservationService } from '../../../../services/admin/reservation.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { map, takeWhile } from 'rxjs/operators';
@Component({
  selector: 'ngx-reservation-course',
  templateUrl: './reservation-course.component.html',
  styleUrls: ['./reservation-course.component.scss']
})
export class ReservationCourseComponent implements OnInit, OnDestroy {
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
    columns: {
      CourseName: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? ' اسم المادة ' : "Course Name",
        type: 'string',
      },
      CoachName: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? ' اسم المدرب' : "Coach Name",
        type: 'string',
      },
      ClientName: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? ' اسم العميل ' : "Client Name ",
        type: 'string',
      }
    },
    actions: {
      columnTitle: this.languageService.getLanguageOrDefault() == 'ar' ? ' اجراءات' : "Actions ",
      add: false,
      edit: false,
      delete: true,
      position: 'right',
    },
  };

  source: LocalDataSource = new LocalDataSource();
  alive: boolean = true;
  constructor(private service: SmartTableData,
    private toastrService: NbToastrService,
    private modalService: BsModalService,
    private router: Router,
    private reservationService: ReservationService,
    private languageService: LanguageService,
    ) {

     
  }

  onEdit(e) {
    this.router.navigate(['/admin/reservation-course/' + e.data.id]);
  }

  onDeleteConfirm(event): void {
    this.warningModel = this.modalService.show(WarningComponent, { class: 'modal-md' });
    this.warningModel.content.boxObj.msg = this.languageService.getLanguageOrDefault() == 'ar' ? 'انت متاكد من الحذف ؟' : 'Are you sure you want to delete this  ?';;
    this.warningModel.content.onClose = (cancel) => {
      if (cancel) {
        this.reservationService.Delete(event.data.id).pipe(takeWhile(() => this.alive)).subscribe(res => {
          if (res.Success) {
            this.warningModel.hide();
            this.toastrService.success(res.Message, "success");
            this.getData()
          }
          else {
            this.toastrService.danger(res.Message, "Error");
          }
        })
      }
    };
  }

  getData() {
    this.reservationService.GetList().pipe(takeWhile(() => this.alive),
      map(d => this.refactorResponse(d))
    ).subscribe(res => {
      this.source.load(res);
      this.Data = res
    });
  } 

  refactorResponse(response) {
    console.log("response", response);
    response.Data.CourseReservations.forEach(element => {
      element['CoachName'] = element.coach.user.first_name + ' ' + element.coach.user.last_name
      element['ClientName'] = element.client.user.first_name + ' ' + element.client.user.last_name,
        element['CourseName'] = this.languageService.getLanguageOrDefault() == 'ar' ? element.entity.name_arabic : element.entity.name_english
    });
    return response.Data.CourseReservations
  }

  Export() {
    this.reservationService.Export().subscribe(res => {
      let path = res.Data;
      window.open(`${environment.api_img}${path}`);
    });
  }
  addNew() {
    this.router.navigate(['/admin/reservation-course/0']);
  }


  filter(filter: string) {
    if (filter.length) {
      const asd = (this.Data.filter(i => {
        let CourseName = i.CourseName;
        let CoachName = i.CoachName;
        let ClientName = i.ClientName;
        return `${CourseName ? CourseName.toLowerCase() : ''}
          ${CoachName ? CoachName.toLowerCase() : ''}
          ${ClientName ? ClientName.toLowerCase() : ''}
          `.indexOf(filter.toLowerCase()) !== -1;
      }))
      this.source.load(asd);
    }
    else {
      this.source.load(this.Data);
    }
  }
  ngOnInit() {
    this.getData();
  }
  ngOnDestroy() {
    this.alive = false;
  }
}