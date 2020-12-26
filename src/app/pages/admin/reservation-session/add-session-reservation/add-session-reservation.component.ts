import {Component, Input, OnInit, TemplateRef, ViewChild,} from '@angular/core';
import {Subject} from 'rxjs';
import {CalendarEvent, CalendarView,} from 'angular-calendar';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment-timezone';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from "ngx-spinner";
import {NbToastrService} from '@nebular/theme';
import {environment} from '../../../../../environments/environment';
import {ServiceService} from '../../../../../services/admin/service.service';
import {ReservationService} from '../../../../../services/admin/reservation.service';
import {ClientService} from '../../../../../services/admin/client.service';
import {LanguageService} from '../../../../../services/language.service';
import {UserService} from '../../../../@core/mock/users.service';
import {AddChildernComponent} from '../../clients/childern/add-childern/add-childern.component';

const colors: any = {
    red: {
        primary: '#4DBDEB',
        secondary: '#4DBDEB',
    },
    blue: {
        primary: '#4DBDEB',
        secondary: '#4DBDEB',
    },
    yellow: {
        primary: '#4DBDEB',
        secondary: '#4DBDEB',
    },
};

@Component({
    selector: 'ngx-add-session-reservation',
    templateUrl: './add-session-reservation.component.html',
    styleUrls: ['./add-session-reservation.component.scss']
})
export class AddSessionReservationComponent implements OnInit {
    @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
    addEditaddressModel: BsModalRef;
    myURL: any
    service: any;
    viewTimes: boolean
    @Input() id
    loading: boolean
    session: any = [];
    onClose: any;
    coaches: any
    form: FormGroup;
    avaliableTime: any
    today = new Date();
    NoTime: boolean
    view: CalendarView = CalendarView.Month;
    clientData: any = null
    isEdit: boolean
    loadmycalender: boolean
    CalendarView = CalendarView;
    myData: any
    @Input() reserveID;
    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();
    events: CalendarEvent[] = [];
    activeDayIsOpen: boolean = false;
    showLoader: boolean = false;
    clients = [];
    reservation: any;
    coach_id:any;
    constructor(private serviceService: ServiceService,
                private formBuilder: FormBuilder,
                private activeRoute: ActivatedRoute,
                public userService: UserService,
                public reservationService: ReservationService,
                public clientService: ClientService,
                public languageService: LanguageService,
                private modalService: BsModalService,
                private router: Router,
                private spinner: NgxSpinnerService,
                private toastr: NbToastrService) {
    }

    dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        this.viewTimes = true
        console.log(this.events, moment(date).format('YYYY-MM-DD'), "DDD");
        this.avaliableTime = this.myData.filter(i => moment(i.start).format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD'));
        this.form.get('date').setValue(moment(date).format('YYYY-MM-DD'))
    }

    ngOnInit() {
        this.myURL = environment.api_img
        this.id = this.router.url.split('/')[3];
        if (this.id != 0) {
            this.spinner.show();
        }
        this.initForm();
        this.clientService.GetList()
            .subscribe((res4) => {
                this.clients = res4.Data;
                this.serviceService.GetList().subscribe(res3 => {
                    this.service = res3.Data;
                    if (this.id != 0) {
                        this.isEdit = true;
                        this.reservationService.GetByID(this.id)
                            .subscribe((res) => {
                                res.Data.foryou = false;
                                res.Data.client_id = this.clients.find((client) => client.client.id === res.Data.client_id).id;
                                if(res.Data.child) {
                                    res.Data.child_id = res.Data.child.id;
                                    if (res.Data.child_id !== null) {
                                        res.Data.foryou = true;
                                    }
                                }

                                res.Data.serviceID = res.Data.entity.service_id;
                                res.Data.entity_id = res.Data.entity.id;
                                this.form.patchValue(res.Data);
                                if(res.Data.foryou) {
                                    this.onChangeClient();
                                }
                                this.serviceService.Session(res.Data.serviceID).subscribe(res2 => {
                                    this.session = res2.Data;
                                    this.coaches = this.session.find(i => i.id == res.Data.entity_id).coaches;
                                    this.coaches.map(i => i.avater = this.myURL + i.user.avater)
                                    this.form.get('total_price').setValue(this.coaches.find(i => i.id == res.Data.coach_id).pivot.price)
                                   // this.form.get('offline_price').setValue(this.coaches.find(i => i.id == res.Data.coach_id).pivot.offline_price)
                                });
                                this.reservation = res.Data;
                                this.form.disable();
                                this.form.get('timeID').enable();
                                this.form.get('date').enable();
                                this.form.get('time_from').enable();
                                this.form.get('time_to').enable();
                                this.form.get('id').enable();
                                this.getTime();
                            }, err => {
                                this.spinner.hide();
                            });
                        // this.form.get('coach_id').setValue(this.id.coach_id)
                        // this.form.get('id').setValue(this.id.id)
                    }
                });
            }, err => {
                this.spinner.hide();
            });
    }


    closeOpenMonthViewDay() {
        this.spinner.show();
        this.getTime();
        this.activeDayIsOpen = true;
    }

    getDataClient() {
        this.clientService.GetByID(this.form.value.client_id).subscribe(res => {
            this.clientData = res.Data;
        })
    }

    addChild() {
        this.addEditaddressModel = this.modalService.show(AddChildernComponent, {
            initialState:
                {clientID: this.form.value.client_id}, class: ''
        });
        this.addEditaddressModel.content.onClose = (res) => {
            this.getDataClient()
        };
    }

    // onChangeCoatch() {
    //     this.form.patchValue({
    //         total_price: 1
    //     });
    // }

    initForm() {
        this.form = this.formBuilder.group({
            id: [0],
            client_id: [null, Validators.required],
            payment_method_id: [1, Validators.required],
            coach_id: [null, Validators.required],
            entity_id: [null, Validators.required],
            entity_type: 'Session',
            timeID: [null, Validators.required],
            type: ['online', Validators.required],
            total_price: [null, Validators.required],
            date: [null, Validators.required],
            time_from: [null, Validators.required],
            time_to: [null, Validators.required],
            serviceID: [null, Validators.required],
            offline_price: [0],
            online_price: [0],
            child_id: [null],
            foryou: [false]
        });

        this.form.get('serviceID').valueChanges.subscribe(serviceID => {
            this.serviceService.Session(serviceID).subscribe(res => {
                this.session = res.Data;
                if (!this.isEdit) {
                    this.form.get('entity_id').setValue(null)
                }
            })
        });

        this.form.get('entity_id').valueChanges.subscribe(entityid => {
            if (entityid != null) {
                if (this.session.length > 0) {
                    this.coaches = this.session.find(i => i.id == entityid).coaches;
                    this.coaches.map(i => i.avater = this.myURL + i.user.avater);
                }
            }
        });

        // this.form.get('date').valueChanges.subscribe(date => {
        //   if (this.form.value.coach_id) {

        // this.reservationService.Time({ date: moment(this.form.value.date).format('YYYY-MM-DD'), coach_id: this.form.value.coach_id }).
        //   subscribe(res => {
        //     if (res.Data) {
        //       this.NoTime = false
        //       this.avaliableTime = res.Data;
        //     }
        //     else {
        //       this.avaliableTime = []
        //       this.NoTime = true
        //     }
        //   })
        // }
        // })

        this.form.get('coach_id').valueChanges.subscribe(coach => {
            if (coach) {
                this.spinner.show();
                if (this.id == 0) {
                    this.form.get('total_price').setValue(this.coaches.find(i => i.id == coach).pivot.price)
                    // this.form.get('offline_price').setValue(this.coaches.find(i => i.id == coach).pivot.offline_price)
                }
                this.getTime();
            }
        });

    }

    onChangeClient() {
        this.getDataClient();
    }

    getTime() {
        this.loadmycalender = true;
        if (this.form.value.coach_id) this.coach_id = this.form.value.coach_id
        this.reservationService.GetListTime(moment(this.viewDate).format('YYYY-MM-DD'), this.coach_id)
            .subscribe(response => {
                this.loadmycalender = false;
                response.Data.map(i => i.start = new Date(i.date));
                response.Data.map(i => i.end = new Date(i.date));
                this.myData = response.Data;
                this.refresh.next();
                this.spinner.hide();
            }, err => {
                this.spinner.hide();
                console.log(this.showLoader, 'errrr');
            });
    }

    update() {
        debugger
        console.log("DDODO",this.form.value);
        this.form.get('id').setValue(this.id)
        if (this.form.value.timeID === null) {
            this.toast();
            return;
        }
        this.spinner.show();
        this.reservationService.UpdateTime(this.form.value)
            .subscribe(res => {
                this.spinner.hide();
                if(res.Success==true){
                    this.toastr.success(res.Message);
                    this.router.navigate(['/admin/reservation-session'])
                }
                else{
                    this.toastr.danger(res.Message);  
                }
                
            }, (err) => {
                this.spinner.hide();
            });
    }

    toast() {
        this.toastr.danger('required');
    }

    save() {
        if (this.form.value.timeID === null) {
            this.toast();
            return;
        }
        this.spinner.show();
        // if (this.form.value.online_price == this.form.value.total_price) {
        //     this.form.get('type').setValue('online')
        // }
        // else {
        //     this.form.get('type').setValue('offline')
        // }
        let time = this.avaliableTime[this.form.value.timeID];
        this.form.get('time_from').setValue(time.time_from);
        this.form.get('time_to').setValue(time.time_to);
        if (this.form.valid) {
            const reservation = {
                id: this.form.value.id,
                client_id: this.clients.find((client) => client.id === this.form.value.client_id).client.id,
                payment_method_id: 1,
                coach_id: this.form.value.coach_id,
                entity_id: this.form.value.entity_id,
                entity_type: 'Session',
                timeID: this.form.value.timeID,
                type: this.form.value.type,
                total_price: this.form.value.total_price,
                date: this.form.value.date,
                time_from: this.form.value.time_from,
                time_to: this.form.value.time_to,
                serviceID: this.form.value.serviceID,
                // offline_price: this.form.value.offline_price,
                // online_price: this.form.value.online_price,
                child_id: this.form.value.child_id,
                foryou: (this.form.value.foryou) ? 2 : 1
            };
            this.reservationService.Post(reservation).subscribe(
                res => {
                    this.spinner.hide();
                    if (res.Success) {
                        this.toastr.success(res.Message);
                        this.router.navigate(['/admin/reservation-session']);
                    } else {
                        this.toastr.danger(res.Message);
                    }
                }, err => {
                    this.spinner.hide();
                });
        } else {
            this.spinner.hide();
            for (const control in this.form.controls) {
                this.form.get(control).markAsDirty();
            }
        }
    }
}


