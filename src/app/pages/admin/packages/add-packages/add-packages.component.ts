
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { SessionService } from '../../../../../services/admin/session.service';
import { environment } from '../../../../../environments/environment';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { ServiceService } from '../../../../../services/admin/service.service';
import { LanguageService } from '../../../../../services/language.service';
import { PackagesService } from '../../../../../services/admin/packages.service';
import { pluck, takeWhile } from 'rxjs/operators';
import { CoachService } from '../../../../../services/admin/coaches.service';
@Component({
  selector: 'app-add-packages',
  templateUrl: './add-packages.component.html',
  styleUrls: ['./add-packages.component.scss']
})
export class AddPackagesComponent implements OnInit, OnDestroy {
  fileData = null;
  img: any;
  allservices: []
  form: FormGroup;
  id: number;
  onClose: any;
  Data: any;
  loading: boolean = false
  coaches: any[] = [];
  sessions: any[] = [];
  alive = true;
  sessionPrice: any;
  constructor(private formBuilder: FormBuilder,
    public myModel: BsModalRef,
    public serviceService: ServiceService,
    public languageService: LanguageService,
    public PackagesService: PackagesService,
    private toastrService: NbToastrService,
    private http: HttpClient,
    private coachService: CoachService
  ) { }
  ngOnInit() {
    //add mode
    if (!this.Data) {
      this.serviceService.GetTree().pipe(takeWhile(() => this.alive)).subscribe(res => { this.allservices = res.Data })
      //get coaches list 
      this.coachService.GetList().pipe(takeWhile(() => this.alive)).subscribe(res => this.coaches = res.Data)
      this.initform()
    }
    //edit mode
    if (this.Data) {
      this.loading = true;
      this.initform()
      this.serviceService.GetTree().pipe(takeWhile(() => this.alive)).subscribe(res => { this.allservices = res.Data })
      //get coaches list 
      this.coachService.GetList().pipe(takeWhile(() => this.alive)).subscribe(res => {
        this.coaches = res.Data
        //get session if coach
        this.coachService.GetSessionsByID(this.Data.coach_id).pipe(takeWhile(() => this.alive)).subscribe(res => {
          this.sessions = res['data']
          //get data by package id 
          this.PackagesService.showById(this.Data.id).pipe(takeWhile(() => this.alive), pluck('data')).subscribe(showRes => {
            this.loading = false;
            this.img = showRes['img'] ? environment.api_img + showRes['img'] : null
            this.form.patchValue(showRes);
          })

        })
      })


    }
  }
  initform() {
    this.form = this.formBuilder.group({
      id: [0],
      name_arabic: [null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      name_english: [null, [Validators.required, Validators.pattern('[0-9A-Za-z ]+$')]],
      description_arabic: [null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      description_english: [null, Validators.required],
      coach_id: [null, Validators.required],
      session_id: [null, Validators.required],
      no_of_session: [0, Validators.required],
      normal_price: [null, Validators.required],
      package_price: [null, Validators.required],
      img: []
    });

    this.form.get('session_id').valueChanges.pipe(takeWhile(() => this.alive)).subscribe(value => {
      let sessionObject = this.sessions.find(s => s.id === value)
      if (sessionObject) this.sessionPrice = parseInt(sessionObject.price);
    })
  }

  onChangeCoach(e) {
    this.form.get('session_id').reset();
    this.sessions = [];
    this.form.get('no_of_session').reset();
    this.form.get('normal_price').reset();
    this.coachService.GetSessionsByID(e).pipe(takeWhile(() => this.alive)).subscribe(res => this.sessions = res['data'])
  }

  onChangeSessionNumbers() {
    if (this.sessionPrice) {
      let normalPrice = this.sessionPrice * this.form.get('no_of_session').value;
      this.form.get('normal_price').setValue(normalPrice);
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.fileData = <File>event.target.files[0];
      this.img = this.fileData
      reader.onload = (event: any) => {
        this.img = (event.target.result);
        this.uploadmyImage(this.fileData);
      }
    }
  }
  uploadmyImage(Data) {
    const formData = new FormData();
    formData.append('img', Data);
    this.http.request(
      new HttpRequest(
        'POST',
        `${environment.api_url}/UploadImage`,
        formData,
        { reportProgress: true }
      )
    ).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        if (event.body['Success']) {
          this.form.get('img').setValue(event.body['Data'].image);
        } else {
          this.toastrService.danger('something wrong upload again');
        }
      }
    });
  }
  save() {
    if (this.form.valid) {
      this.loading = true
      if (this.form.value.id == 0) {
        this.PackagesService.Post(this.form.value).subscribe(
          res => {
            if (res['success']) {
              this.toastrService.success(res['message'], "success");
              this.myModel.hide();
              this.loading = false;
              this.onClose();
            } else {
              this.toastrService.danger(res['message']);
              this.loading = false
            }
          }
        );
      } else if (this.form.value.id > 0) {
        this.PackagesService.Update(this.form.value).subscribe(
          res => {
            if (res['success']) {
              this.toastrService.success(res['message'], "success");
              this.myModel.hide();
              this.onClose();
            } else {
              this.toastrService.danger(res['message'], "Error");
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
  ngOnDestroy() {
    this.alive = false;
  }
}
