import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { ReservationService } from '../../../../../../services/admin/reservation.service';
import * as moment from 'moment-timezone';
import { map, takeWhile } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { LanguageService } from '../../../../../../services/language.service';

@Component({
  selector: 'app-coach-times',
  templateUrl: './coach-times.component.html',
  styleUrls: ['./coach-times.component.scss']
})
export class CoachTimesComponent implements OnInit, OnDestroy {
  refresh: Subject<any> = new Subject();
  times: any;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  coachId: number;
  loading: boolean;
  alive = true;
  avaliableTimes = []
  selectedTime;
  onClose;
  constructor(public modal: BsModalRef,
    private reservationService: ReservationService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    if (this.modal.content)
      this.coachId = this.modal.content.coachId
    this.getTime(this.coachId)
  }

  getTime(coachId) {
    this.loading = true
    // this.loadmycalender = true;
    this.reservationService.GetListTime(moment(this.viewDate).format('YYYY-MM-DD'), coachId)
      .pipe(takeWhile(() => this.alive)
        , map(res => this.refactorResponse(res))
      )
      .subscribe(response => {
        this.times = response.Data;
        this.refresh.next();
        this.loading = false
      }, err => {
        // console.log(err);
        this.loading = false

      });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.selectedTime = null;
    this.avaliableTimes = this.times.filter(i => moment(i.start).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'));
    // this.form.get('date').setValue(moment(date).format('YYYY-MM-DD'))
  }

  closeOpenMonthViewDay() {
    this.getTime(this.coachId);
    // this.activeDayIsOpen = true;
  }

  refactorResponse(res) {
    res.Data.forEach(element => {
      element['start'] = new Date(element.date)
      element['end'] = new Date(element.date)
    });
    return res
  }

  addTime() {
    this.onClose(this.selectedTime)
    this.modal.hide();
  }

  ngOnDestroy() {
    this.alive = false
  }

}
