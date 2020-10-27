

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { SessionService } from '../../../../../services/admin/session.service';
import { NbToastrService } from '@nebular/theme';
import { EventService } from '../../../../../services/admin/event.service';
import { CoachService } from '../../../../../services/admin/coaches.service';
import { LanguageService } from '../../../../../services/language.service';
import * as moment from 'moment-timezone';
import { Time } from '@angular/common';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../../../services/admin/client.service';
import { ReservationService } from '../../../../../services/admin/reservation.service';
@Component({
  selector: 'ngx-add-event-reservation',
  templateUrl: './add-event-reservation.component.html',
  styleUrls: ['./add-event-reservation.component.scss']
})
export class AddEventReservationComponent implements OnInit {
  URLrouters: any[] = this.router.url.split('/');
  mytime: Time;
  mytimeTo: Time
  form: FormGroup;
  id: number;
  onClose: any;
  coaches: any;
  Data: any;
  fileData = null;
  img: any;
  Client: any
  event:any
  loading:boolean
  constructor(private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    public eventService: EventService,
    private toastrService: NbToastrService,
    private reservationService:ReservationService,
    public coachService: CoachService,
    private http: HttpClient,
    private router: Router,
    private clientService: ClientService,
    public languageService: LanguageService
  ) { }
  ngOnInit() {
    this.clientService.GetList().subscribe(res => {
      this.Client = res.Data
    })

    this.eventService.eventnotClosed().subscribe(res=>{this.event=res.Data;
    })
    this.coachService.GetList().subscribe(res => { this.coaches = res.Data })
    this.initform()
    if (+this.activeRoute.snapshot.paramMap.get('id') > 0) {
      this.reservationService.GetByID(+this.activeRoute.snapshot.paramMap.get('id')).subscribe(res => {
        this.img = res.Data.img ? environment.api_img + '/' + res.Data.img : null
        res.Data.total=res.Data.total_price
        this.form.patchValue(res.Data);
      })
    }
  }
  
  initform() {
    this.form = this.formBuilder.group({
      id: [0],
      name_arabic: [null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      name_english: [null, [Validators.required, Validators.pattern('[0-9A-Za-z ]+$')]],
      description_arabic: [null],
      description_english: [null],
      client_id: [null, [Validators.required]],
      payment_method_id: 1,
      entity_id: [null, [Validators.required]],
      entity_type: 'Event',
      type: [null, [Validators.required]],
      no_of_ticket: [0, [Validators.required, Validators.min(1)]],
      price:[null, [Validators.required]],
      address: [null],
      date: [null, [Validators.required]],
      time_from: [null, Validators.required],
      time_to: [null, [Validators.required]],
      total:null,
      img: [null]
    });

    this.form.get('entity_id').valueChanges.subscribe(entityid => {
      if (entityid != null) {
        this.loading=true
        this.eventService.GetByID(entityid).subscribe(res=>{
          this.loading=false
          this.img=res.Data.img?environment.api_img+'/'+res.Data.img:null
          this.mytime=res.Data.time_from
          this.mytimeTo=res.Data.time_to
          res.Data.id=+this.activeRoute.snapshot.paramMap.get('id')
        this.form.patchValue(res.Data);
         })
      }
    })
    this.form.get('no_of_ticket').valueChanges.subscribe(no_of_ticket => {
      if (no_of_ticket != null) {
        let value=no_of_ticket*this.form.value.price
        this.form.get('total').setValue(value)
      }})
  }

  save() {
    console.log(this.form.value,"LLL");
    
    debugger
    if (this.form.valid) {
      this.loading=true
      if (this.form.value.id == 0) {
        this.reservationService.Post(this.form.value).subscribe(
          res => {
            this.loading=false
            if (res.Success) {
              this.toastrService.success(res.Message, "success");
              this.URLrouters.splice(-1, 1)
              this.router.navigateByUrl(this.URLrouters.join('/'));
            } else {
              this.toastrService.danger(res.Message);
            }
          }
        );
      } else if (this.form.value.id > 0) {
        this.reservationService.Update(this.form.value).subscribe(
          res => {
            this.loading=false
            if (res.Success) {
              this.toastrService.success(res.Message, "success");
              this.URLrouters.splice(-1, 1)
              this.router.navigateByUrl(this.URLrouters.join('/'));
            } else {
              this.toastrService.danger(res.Message, "Error");
            }
          }
        );
      }
    }
    else {
      for (let control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }

    }
  }

}

