import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../@core/data/solar';
import { DashBoardService } from '../../../services/admin/dashboard.service';
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  totalData: any
  date: any = new Date();
  EndDate: any = null;
  StartDate: any = null;
  SessionReservations: any[] = []
  EventReservations: any[] = []
  private alive = true;
  newResrvation: any;
  solarValue: number;
  lightCard: CardSettings = {
    title: 'New Reservation',
    iconClass: 'fa fa-user color-icon',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Upcoming Event',
    iconClass: 'fa fa-bullhorn ng-star-inserted color-icon ',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Need Confirmation',
    iconClass: 'ion-checkmark-circled ng-star-inserted color-icon',
    type: 'info',
  };


  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,

  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
      default: this.commonStatusCardsSet,
      cosmic: this.commonStatusCardsSet,
      corporate: [
        {
          ...this.lightCard,
          type: 'warning',
        },
        {
          ...this.rollerShadesCard,
          type: 'primary',
        },
        {
          ...this.wirelessAudioCard,
          type: 'danger',
        },

      ],
      dark: this.commonStatusCardsSet,
    };

  constructor(private themeService: NbThemeService,
    private dashBoardService: DashBoardService,
    private router: Router,
    private solarService: SolarData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }
  changeDate() {
    this.dashBoardService.CalendarReservation({
      date_from: moment(this.StartDate).format('DD-MM-YYYY'),
      date_to: moment(this.EndDate).format('DD-MM-YYYY'),
    }
    ).subscribe(res => {
      this.SessionReservations = res.Data.SessionReservations
      this.EventReservations = res.Data.EventReservations
    })
  }
  goToReservation(id) {
    this.router.navigate(['/admin/reservation-session/' + id]);
  }
  ngOnInit() {
    this.dashBoardService.TotalData().subscribe(res => { this.totalData = res.Data; })
    this.dashBoardService.NewReservation().subscribe(res => { this.newResrvation = res.Data })
    this.dashBoardService.CalendarReservation({date_from: moment(new Date()).format('DD-MM-YYYY'),
    date_to: moment(new Date()).format('DD-MM-YYYY'),
  }).subscribe(res => {
      this.SessionReservations = res.Data.SessionReservations
      this.EventReservations = res.Data.EventReservations
    })
  }
}
