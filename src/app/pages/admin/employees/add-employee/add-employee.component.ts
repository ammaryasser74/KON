

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { EmployeeService } from '../../../../../services/admin/Employee.service';
import { CityService } from '../../../../../services/settings/cities.service';
import { CountryService } from '../../../../../services/settings/country.service';
import { LanguageService } from '../../../../../services/language.service';
import { RolesService } from '../../../../../services/admin/role.service';
@Component({
  selector: 'ngx-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  roles:any;
  country:any;
  cities:any;
  onClose: any;
  id:number;
  Data:any;
  selected = [];
  myRoles:any=[];
  constructor(private formBuilder: FormBuilder, 
    public languageService:LanguageService,
    public myModel: BsModalRef,
    public toasterService:NbToastrService,
    public rolesService:RolesService,
    private cityService:CityService,
    private countryService:CountryService,
    private employeeService:EmployeeService,
    ) { }
    ngOnInit() {
      this.rolesService.GetList().subscribe(res=>{this.roles=res.Data})
      this.countryService.Getall().subscribe(res=>{this.country=res.Data;})
       this.initForm();
       if(this.Data){
         this.Data.address=this.Data.admin.address
         this.Data.firs_tname=this.Data.first_name
         this.Data.last_name=this.Data.last_name
         this.Data.city_id=this.Data.city_id
         this.Data.country_id=this.Data.country_id
         this.Data.UserID=this.Data.admin.user_id,
         this.Data.job=this.Data.admin.job
         this.form.patchValue(this.Data);
         this.Data.admin.roles.forEach(element => {
          this.selected.push(element.id);
        });
        this.form.get('roles').setValue(this.selected)
         this.form.get('password').setValidators(null);
         this.form.get('password').updateValueAndValidity();
       }
       else{
         this.form.get('password').setValidators(Validators.required);
         this.form.get('password').updateValueAndValidity();
       }
     }
     initForm() {
       this.form = this.formBuilder.group({
         id: [0],
         UserID: [0],
         type:'admin',
         email:[null, Validators.required],
        //  username: [null, Validators.required],
         phone:[null, [Validators.required]],
         password: [null],
         first_name: [null],
         gender: [],
         roles:[],
         job:[null],
         last_name: [null, Validators.required],
         address:[null, Validators.required],
         country_id :[null, Validators.required],
         city_id:[null, Validators.required],
       });
       this.form.get('country_id').valueChanges.subscribe(country=>{
        this.cityService.GetList(country).subscribe(res=>{this.cities=res.Data})   
       })
     }
     save() {
       if (this.form.valid) {
         if (this.form.value.id == 0) {
           this.employeeService.Post(this.form.value).subscribe(
             res => {
               if (res.Success) {
                 this.toasterService.success(res.Message,"Sucess");
                 this.myModel.hide();
                 this.onClose();
               } else {
                 this.toasterService.danger(res.Message,"Sucess");
               }
             }
           );
         } else if (this.form.value.id > 0 && this.form.dirty) {
           this.employeeService.Update(this.form.value).subscribe(
             res => {
               if (res.Success) {
                 this.toasterService.success(res.Message);
                 this.myModel.hide();
                 this.onClose();
               } else {
                 this.toasterService.danger(res.Message[0]);
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
