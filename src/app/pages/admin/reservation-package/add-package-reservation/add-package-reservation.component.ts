import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild, } from '@angular/core';
import { pipe, Subject } from 'rxjs';
import { CalendarEvent, CalendarView, } from 'angular-calendar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../../../environments/environment';
import { ServiceService } from '../../../../../services/admin/service.service';
import { ReservationService } from '../../../../../services/admin/reservation.service';
import { ClientService } from '../../../../../services/admin/client.service';
import { LanguageService } from '../../../../../services/language.service';
import { UserService } from '../../../../@core/mock/users.service';
import { take, takeWhile } from 'rxjs/operators';
import { PackagesService } from '../../../../../services/admin/packages.service';

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
    selector: 'ngx-add-package-reservation',
    templateUrl: './add-package-reservation.component.html',
    styleUrls: ['./add-package-reservation.component.scss']
})
export class AddPackageReservationComponent implements OnInit, OnDestroy {
    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
    @Input() id
    loading: boolean
    clients = [];
    sessions = [];
    form: FormGroup
    packages = []
    alive: boolean = true;
    editId: any;
    coachId: number;
    no_of_session: number;
    editData: any;
    session_id: any;
    constructor(private serviceService: ServiceService,
        private formBuilder: FormBuilder,
        private activeRoute: ActivatedRoute,
        public userService: UserService,
        public reservationService: ReservationService,
        public clientService: ClientService,
        public languageService: LanguageService,
        private modalService: BsModalService,
        private packageService: PackagesService,
        private router: Router,
        private toastr: NbToastrService) {
        this.editId = +this.activeRoute.snapshot.params.id;
    }
    get times(): FormArray {
        return this.form.get("times") as FormArray
    }

    newTime(timeObject): FormGroup {
        return this.formBuilder.group(timeObject)
    }
    addTimes(time) {
        this.times.push(this.newTime(time));
    }

    createItem(): FormGroup {
        return this.formBuilder.group({
            date: ['', Validators.required],
            time_from: ['', Validators.required],
            time_to: ['', Validators.required],
            session_id: null,
            status: null
        });
    }

    ngOnInit() {

        this.reservationService.sendDate.pipe(takeWhile(() => this.alive)).subscribe(res => {
            let picked = (({ date, status, time_from, time_to }) => ({ date, status, time_from, time_to }))(res['data']);
            if (this.times.controls[res['index']]) {
                picked.status = "pending";
                this.times.controls[res['index']].patchValue(picked);
            }
            else {
                picked.status = "pending";
                this.addTimes(picked)
            }

        })
        if (!this.editId) {
            this.clientService.GetList().pipe(takeWhile(() => this.alive)).subscribe(res => this.clients = res['Data'])
            this.packageService.GetList().pipe(takeWhile(() => this.alive)).subscribe(res => this.packages = res['data'])
            this.initForm();
        }
        else {
            this.initForm();
            this.loading = true
            this.clientService.GetList().pipe(takeWhile(() => this.alive)).subscribe(res => {
                this.clients = res['Data']
                this.packageService.GetList().pipe(takeWhile(() => this.alive)).subscribe(res => {
                    this.packages = res['data']
                    this.reservationService.GetByID(this.editId).pipe(takeWhile(() => this.alive)).subscribe(showRes => {
                        if (showRes['Success']) {
                            this.onchangeEntity()
                            showRes['Data']['times'] = JSON.parse(JSON.stringify(showRes['Data']['time']))
                            this.editData = JSON.parse(JSON.stringify(showRes['Data']));
                            this.loading = false;
                            this.form.patchValue(showRes['Data']);
                        }
                        else {
                            this.loading = false;
                            this.toastr.danger(showRes.Message)
                        }
                    })
                })
            })

        }

    }

    onchangeEntity() {
        this.form.get("entity_id").valueChanges
            .pipe(takeWhile(() => this.alive),
                take(1))
            .subscribe(value => {
                let selectedPackage = this.packages.find(d => d.id === value);
                this.coachId = selectedPackage.coach_id
                this.no_of_session = selectedPackage.no_of_session;
                let session = {
                    sessionName: this.languageService.getLanguageOrDefault() === 'ar' ? selectedPackage.name_arabic : selectedPackage.name_english,
                    date: null,
                    timeFrom: null,
                    timeTo: null,
                }
                let sessions = Array(this.no_of_session).fill(session)
                let copySessions = JSON.parse(JSON.stringify(sessions))
                this.editData.times.forEach((element, index) => {
                    copySessions[index]['date'] = element['date']
                    copySessions[index]['timeFrom'] = element['time_from']
                    copySessions[index]['timeTo'] = element['time_to']
                });
                this.sessions = JSON.parse(JSON.stringify(copySessions))
                this.times.patchValue(this.editData.times);
                this.session_id = this.editData.entity.session_id;
            })
    }

    initForm() {
        this.form = this.formBuilder.group({
            id: [0],
            client_id: [null, Validators.required],
            payment_method_id: [1, Validators.required],
            entity_id: [null, Validators.required],
            entity_type: 'Package',
            times: this.formBuilder.array([this.createItem()], [Validators.required])
        })
    }

    onChangePackage(value) {
        let selectedPackage = this.packages.find(d => d.id === value);
        this.coachId = selectedPackage.coach_id
        this.no_of_session = selectedPackage.no_of_session;
        let session = {
            sessionName: this.languageService.getLanguageOrDefault() === 'ar' ? selectedPackage.name_arabic : selectedPackage.name_english,
            date: null,
            timeFrom: null,
            timeTo: null,
            session_id: selectedPackage.session_id
        }
        this.sessions = [];
        this.times.reset();
        this.sessions = Array(this.no_of_session).fill(session)
    }

    save() {
        if (this.form.valid && !this.form.value.id) {
            this.loading = true
            this.reservationService.Post(this.form.value).pipe(takeWhile(() => this.alive)).subscribe(res => {
                if (res.Success) {
                    this.toastr.success(res.Message);
                    this.router.navigate(['/admin/reservation-package']);
                    this.loading = false;
                }
                else {
                    this.toastr.danger(res.Message, "Error");
                    this.loading = false;
                }
            })
        }
        else {
            this.loading = true;
            this.form.get('entity_type').setValue("Package")
            this.addSessionIdToTimes();
            this.reservationService.UpdateTime(this.form.value).pipe(takeWhile(() => this.alive))
                .subscribe(res => {
                    if (res.Success == true) {
                        this.toastr.success(res.Message);
                        this.router.navigate(['/admin/reservation-package'])
                        this.loading = false;
                    }
                    else {
                        this.toastr.danger(res.Message);
                        this.loading = false;
                    }

                }, (err) => {
                    this.loading = false;
                });
        }
    }
    addSessionIdToTimes() {
        this.times.value.forEach(element => {
            element['session_id'] = this.session_id;
        });
    }

    ngOnDestroy() {
        this.alive = false;
    }
}


