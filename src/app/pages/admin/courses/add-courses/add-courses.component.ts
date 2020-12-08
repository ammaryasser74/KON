
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { environment } from '../../../../../environments/environment';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { ServiceService } from '../../../../../services/admin/service.service';
import { LanguageService } from '../../../../../services/language.service';
import { pluck, takeWhile } from 'rxjs/operators';
import { CoachService } from '../../../../../services/admin/coaches.service';
import { CoursesService } from '../../../../../services/admin/courses.service';
@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss']
})
export class AddCoursesComponent implements OnInit, OnDestroy {
  fileData = null;
  img: any;
  allservices: []
  form: FormGroup;
  id: number;
  onClose: any;
  Data: any;
  loading: boolean = false
  coaches: any[] = [];
  alive = true;
  constructor(private formBuilder: FormBuilder,
    public myModel: BsModalRef,
    public serviceService: ServiceService,
    public languageService: LanguageService,
    public CoursesService: CoursesService,
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
          //get data by package id 
          this.CoursesService.showById(this.Data.id).pipe(takeWhile(() => this.alive), pluck('Data')).subscribe(showRes => {
            this.loading = false;
            this.img = showRes['img'] ? environment.api_img + showRes['img'] : null
            this.form.patchValue(showRes);
          })

        })
    }
  }
  initform() {
    this.form = this.formBuilder.group({
      id: [0],
      name_arabic: [null, [Validators.required, Validators.pattern('^[\u0621-\u064A\u0660-\u0669 ]+$')]],
      name_english: [null, [Validators.required, Validators.pattern('[0-9A-Za-z ]+$')]],
      description_arabic: [null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      description_english: [null, Validators.required],
      coach_id: [null, Validators.required],
      isactive: [1, Validators.required],
      price: [null, Validators.required],
      img: []
    });


  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.fileData = <File>event.target.files[0];
      this.img = this.fileData
      reader.onload = (event: any) => {
        if (this.getSizeInMB(event.total) < 1) {
          this.img = (event.target.result);
          this.uploadmyImage(this.fileData);
        }
        else {
          this.img = "";
          let errMsg = this.languageService.getLanguageOrDefault() === 'ar' ?
            'حجم الصورة لا يجب ان يكون اكبر من 1 ميجا بايت' :
            "uploaded image size is greater than 1 MB";

          let errHeader = this.languageService.getLanguageOrDefault() === 'ar' ? "خطا" : "ERROR"
          this.toastrService.danger(errMsg, errHeader, {
            duration: 3000
          })
        }
      }
    }
  }

  getSizeInMB(byte) {
    return byte / 1024 / 1024
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
        this.CoursesService.Post(this.form.value).subscribe(
          res => {
            if (res['Success']) {
              this.toastrService.success(res['Message'], "success");
              this.myModel.hide();
              this.loading = false;
              this.onClose();
            } else {
              this.toastrService.danger(res['Message']);
              this.loading = false
            }
          }
        );
      } else if (this.form.value.id > 0) {
        this.CoursesService.Update(this.form.value).subscribe(
          res => {
            if (res['Success']) {
              this.toastrService.success(res['Message'], "success");
              this.myModel.hide();
              this.onClose();
              this.loading=false;
            } else {
              this.toastrService.danger(res['Message'], "Error");
              this.loading=false;
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
