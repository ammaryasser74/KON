
import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { LanguageService } from '../../../../services/language.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WarningComponent } from '../../warning/warning.component';
import { ReservationService } from '../../../../services/admin/reservation.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-reservation-event',
  templateUrl: './reservation-event.component.html',
  styleUrls: ['./reservation-event.component.scss']
})
export class ReservationEventComponent implements OnInit {
  name = '';
  Data: any;
  loading: boolean
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
      SessionName: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? ' اسم المحاضره' : "Session Name",
        type: 'string',
      },
      CoachName: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? ' اسم المدرب' : "Coach Name",
        type: 'string',
      },
      ClientName: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? ' اسم العميل ' : "Client Name ",
        type: 'string',
      },
      type: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'نوع الحجز' : "Type",
        type: 'string',
      },
      date: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'التاريخ' : "Date ",
        type: 'string',
      }
      ,
      total_price: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'السعر' : "Price ",
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

  constructor(private service: SmartTableData,
    private router: Router,
    private toastrService: NbToastrService,
    private modalService: BsModalService,
    private reservationService: ReservationService,
    private dialogService: NbDialogService,
    private languageService: LanguageService) {
  }

  onEdit(e) {
    this.router.navigate(['/admin/reservation-event/' + e.data.id]);
  }

  onDeleteConfirm(event): void {
    this.warningModel = this.modalService.show(WarningComponent, { class: 'modal-sm' });
    this.warningModel.content.boxObj.msg = this.languageService.getLanguageOrDefault() == 'ar' ? 'انت متاكد من الحذف ؟' : 'Are you sure you want to delete this  ?';;
    this.warningModel.content.onClose = (cancel) => {
      if (cancel) {
        this.reservationService.Delete(event.data.id).subscribe(res => {
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
    this.reservationService.GetList().subscribe(res => {
      res.Data.EventReservations.map(i => i.SessionName = i.entity ? i.entity.name_arabic : "")
      res.Data.EventReservations.map(i => i.CoachName = i.coach.user.first_name + ' ' + i.coach.user.last_name)
      res.Data.EventReservations.map(i => i.ClientName = i.client.user.first_name + ' ' + i.client.user.last_name)
      this.source.load(res.Data.EventReservations);
      this.Data = res.Data.EventReservations;

    });
  }

  Export() {
    this.reservationService.ExportEvent().subscribe(res => {
      let path = res.Data;
      window.open(`${environment.api_img}${path}`);
    });
  }

  addNew() {
    this.router.navigate(['/admin/reservation-event/0']);
  }


  filter(filter: string) {
    if (filter.length) {
      const asd = (this.Data.filter(i => {
        let SessionName = i.entity.name_arabic;
        let type = i.type;
        let CoachName = i.CoachName;
        let ClientName = i.ClientName;
        return `${SessionName ? SessionName.toLowerCase() : ''}
          ${type ? type.toLowerCase() : ''}
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
}