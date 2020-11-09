import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild, } from '@angular/core';
import { pipe, Subject } from 'rxjs';
import { CalendarEvent, CalendarView, } from 'angular-calendar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { AddChildernComponent } from '../../clients/childern/add-childern/add-childern.component';
import { takeWhile } from 'rxjs/operators';
import { CoursesService } from '../../../../../services/admin/courses.service';

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
    selector: 'ngx-add-course-reservation',
    templateUrl: './add-course-reservation.component.html',
    styleUrls: ['./add-course-reservation.component.scss']
})
export class AddCourseReservationComponent implements OnInit, OnDestroy {
    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
    @Input() id
    loading: boolean
    clients = [];
    form: FormGroup
    courses = []
    alive: boolean = true;
    editId: any;
    constructor(private serviceService: ServiceService,
        private formBuilder: FormBuilder,
        private activeRoute: ActivatedRoute,
        public userService: UserService,
        public reservationService: ReservationService,
        public clientService: ClientService,
        public languageService: LanguageService,
        private modalService: BsModalService,
        private courseService: CoursesService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastr: NbToastrService) {
        this.editId = +this.activeRoute.snapshot.params.id;
    }

    ngOnInit() {        
        if (!this.editId) {
            this.clientService.GetList().pipe(takeWhile(() => this.alive)).subscribe(res => this.clients = res['Data'])
            this.courseService.GetList().pipe(takeWhile(() => this.alive)).subscribe(res => this.courses = res['data'])
            this.initForm();
        }
        else {
            this.initForm();
            this.loading = true
            this.clientService.GetList().pipe(takeWhile(() => this.alive)).subscribe(res => {
                this.clients = res['Data']
                this.courseService.GetList().pipe(takeWhile(() => this.alive)).subscribe(res => {
                    this.courses = res['data']
                    this.reservationService.GetByID(this.editId).pipe(takeWhile(() => this.alive)).subscribe(showRes => {
                        if (showRes['Success']) {
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

    initForm() {
        this.form = this.formBuilder.group({
            id: [0],
            client_id: [null, Validators.required],
            payment_method_id: [1, Validators.required],
            entity_id: [null, Validators.required],
            entity_type: 'Course'
        })
    }
    save() {
        if (this.form.valid && !this.form.value.id) {
            this.loading = true
            this.reservationService.Post(this.form.value).pipe(takeWhile(() => this.alive)).subscribe(res => {
                if (res.Success) {
                    this.toastr.success(res.Message);
                    this.router.navigate(['/admin/reservation-course']);
                    this.loading = false;
                }
                else {
                    this.toastr.danger(res.Message,"Error");
                        this.loading=false;
                }
            })
        }
        else {
            this.loading = true
            this.form.get('entity_type').setValue("Course")
            this.reservationService.Update(this.form.value).pipe(takeWhile(() => this.alive)).subscribe(res => {
                if (res.Success) {
                    this.toastr.success(res.Message);
                    this.router.navigate(['/admin/reservation-course']);
                    this.loading = false;
                }
                else {
                    this.loading = false;
                    this.toastr.danger(res.Message);
                }
            })
        }
    }

    ngOnDestroy() {
        this.alive = false;
    }
}


