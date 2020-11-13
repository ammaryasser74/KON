import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LanguageService } from '../../../../../../services/language.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService } from '@nebular/theme';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CoachTimesComponent } from '../coach-times/coach-times.component';
import { ReservationService } from '../../../../../../services/admin/reservation.service';

@Component({
  selector: 'app-reservation-package-session-table',
  templateUrl: './reservation-package-session-table.component.html',
  styleUrls: ['./reservation-package-session-table.component.scss']
})
export class ReservationPackageSessionTableComponent implements OnInit, OnChanges {
  modal: BsModalRef;


  settings = {
    mode: 'external',
    hideSubHeader: true,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
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
      sessionName: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? ' اسم المحاضرة ' : "Session Name",
        type: 'string',
      },
      date: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? ' التاريخ' : "Date ",
        type: 'string',
      },
      timeFrom: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'وقت البدء' : " Time From ",
        type: 'string',
      },
      timeTo: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'وقت الانتهاء' : "Time To ",
        type: 'string',
      }
    },
    actions: {
      columnTitle: this.languageService.getLanguageOrDefault() == 'ar' ? ' اجراءات' : "Actions ",
      add: false,
      edit: true,
      delete: false,
      position: 'right',
    },
  };
  source: LocalDataSource = new LocalDataSource();

  @Input() sessions: any;
  @Input() coachId: any;

  constructor(private languageService: LanguageService,
    private toastrService: NbToastrService,
    private modalService: BsModalService,
    private reservationService: ReservationService
  ) { }

  ngOnInit() {
    this.reservationService.sendDate.subscribe(res => {
      let newSessions = JSON.parse(JSON.stringify(this.sessions))
      newSessions[res.index]['date'] = res['data']['date']
      newSessions[res.index]['timeFrom'] = res['data']['time_from']
      newSessions[res.index]['timeTo'] = res['data']['time_to']
      this.sessions= JSON.parse(JSON.stringify(newSessions))
      this.source.load( this.sessions)
    })
  }

  onEdit(e) {
    let previousIndex = e.index - 1;
    let index = e.index
    // console.log(this.sessions[previousIndex],e.index,previousIndex);
    if (this.sessions[previousIndex] && !this.sessions[previousIndex]['date']) {
      this.showErrorMsg();
    }
    else {
      this.modal = this.modalService.show(CoachTimesComponent, {
        initialState:
          { coachId: this.coachId, }, class: 'modal-lg', backdrop: 'static'
      });
      this.modal.content.onClose = (res) => {
        this.reservationService.sendDate.next({ index: index, data: res })
      };

    }
  }
  showErrorMsg() {
    let errorMsg = this.languageService.getLanguageOrDefault() === 'ar' ?
      "يجب اضافة المواعيد حسب ترتيب المحاضرة " :
      "you must arrange the times As session arrangment";
    this.toastrService.danger(errorMsg);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.source.load(changes.sessions.currentValue)
  }

}
