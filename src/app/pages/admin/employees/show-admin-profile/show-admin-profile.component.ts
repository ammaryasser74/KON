
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

import { RolesService } from '../../../../../services/admin/role.service';
import { EmployeeService } from '../../../../../services/admin/Employee.service';
import { LanguageService } from '../../../../../services/language.service';
import { CityService } from '../../../../../services/settings/cities.service';
import { ToasterService } from 'angular2-toaster';
import { ResetPasswordComponent } from '../../reset-password/reset-password.component';
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../../services/user/auth.service';
import { CountryService } from '../../../../../services/settings/country.service';
import { pipe } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-show-admin-profile',
  templateUrl: './show-admin-profile.component.html',
  styleUrls: ['./show-admin-profile.component.css']
})
export class ShowAdminProfileComponent implements OnInit {
  form: FormGroup;
  roles: any;
  fileData = null;
  img: any;
  showpage: boolean = false;
  cities: any;
  country: any;
  selected: any = []
  Data: any;
  myRoles: any = [];
  alive: boolean = true;
  loaded: boolean
  constructor(private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private employeeService: EmployeeService,
    private cityService: CityService,
    public modalService: BsModalService,
    private activeRoute: ActivatedRoute,
    private languageService: LanguageService,
    private countryService: CountryService,
    private localStorageService: LocalStorageService,
    private notifyService: NbToastrService,
    public authService: AuthService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.rolesService.GetList().pipe(takeWhile(() => this.alive)).subscribe(res => this.roles = res.Data)
    this.countryService.Getall().pipe(takeWhile(() => this.alive)).subscribe(res => this.country = res.Data)
    // this.rolesService.GetList().subscribe(res=>this.roles=res.Data)
    this.cityService.Getall().pipe(takeWhile(() => this.alive)).subscribe(res => this.cities = res.Data.data)
    this.initForm();
    this.employeeService.GetByID(+this.activeRoute.snapshot.paramMap.get('id')).pipe(takeWhile(() => this.alive)).subscribe(
      res => {
        this.loaded = true;
        res.Data.address = res.Data.admin.address
        res.Data.firs_tname = res.Data.first_name
        res.Data.last_name = res.Data.last_name
        res.Data.city_id = res.Data.city_id
        res.Data.country_id = res.Data.country_id
        res.Data.UserID = res.Data.user_id

        if (res.Data.avatar != null) {
          this.img = res.Data.avatar
        }

        this.form.patchValue(res.Data);
        res.Data.admin.roles.forEach(element => {
          this.selected.push(element.id);
        });
        this.form.get('roles').setValue(this.selected)
      })

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
    this.http
      .request(
        new HttpRequest(
          'POST',
          `${environment.api_url}/UploadImage`,
          formData,
          { reportProgress: true }
        )
      )
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          if (event.body['Success']) {
            this.form.get('avatar').setValue(event.body['Data'].image);

          } else {
            this.notifyService.danger('something wrong upload again');
          }
        }
      });
  }

  changePasswort() {
    this.modalService.show(ResetPasswordComponent, {
      initialState:
        { id: +this.activeRoute.snapshot.paramMap.get('id') }, class: 'modal-md'
    })
  }
  initForm() {
    this.form = this.formBuilder.group({
      id: [0],
      UserID: [0],
      type: 'admin',
      gender: [],
      avatar: [null],
      email: [null, Validators.required],
      phone: [null, [Validators.required]],
      first_name: [null],
      last_name: [null, Validators.required],
      address: [null, Validators.required],
      country_id: [null, Validators.required],
      city_id: [null, Validators.required],
      roles: [[]],
    });
    this.form.get('country_id').valueChanges.subscribe(country => {
      this.cityService.GetList(country).subscribe(res => { this.cities = res.Data })
      this.form.get('city_id').setValue('')
    })
  }
  save() {
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.employeeService.Post(this.form.value).subscribe(
          res => {
            if (res.Success) {
              this.notifyService.success(res.Message);
            } else {
              this.notifyService.danger(res.Message[0]);
            }
          }
        );
      } else if (this.form.value.id > 0 && this.form.dirty) {
        this.employeeService.Update(this.form.value).subscribe(
          res => {
            if (res.Success) {
              this.notifyService.success(res.Message, "Sucess");
            } else {
              this.notifyService.danger(res.Message[0], "Error");
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
