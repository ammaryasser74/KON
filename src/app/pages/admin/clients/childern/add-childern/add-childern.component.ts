

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { CityService } from '../../../../../../services/settings/cities.service';
import { CountryService } from '../../../../../../services/settings/country.service';
import { LanguageService } from '../../../../../../services/language.service';
import { ClientService } from '../../../../../../services/admin/client.service';
import { ChildService } from '../../../../../../services/admin/children.service';
import * as moment from 'moment-timezone';
@Component({
  selector: 'ngx-add-childern',
  templateUrl: './add-childern.component.html',
  styleUrls: ['./add-childern.component.scss']
})
export class AddChildernComponent implements OnInit {
  form: FormGroup;
  jobs:any;
  country:any;
  cities:any;
  onClose: any;
  id:number;
  today = new Date();
  Data:any;
  @Input() clientID
  martial_status:any;
  showJobName:boolean=false
  constructor(private formBuilder: FormBuilder, 
    public languageService:LanguageService,
    public myModel: BsModalRef,
    private clientService:ClientService,
    public toasterService:NbToastrService,
    private cityService:CityService,
    private countryService:CountryService,
    private childService:ChildService,
    ) { }
    ngOnInit() {
      //
    // this.clientService.GetByID(this.clientID).subscribe(res=>{
    //   this.form.get('client_id').setValue(res.Data.client.id)
    // })
      this.countryService.Getall().subscribe(res=>{this.country=res.Data;})
       this.initForm();
       if(this.Data){
         this.form.patchValue(this.Data)
       }
     }
     
     initForm() {
       this.form = this.formBuilder.group({
         id: [0],
         name: [null,Validators.required],
         gender: [],
         age:[null],
         birthdate:[null],
         client_id:this.clientID
       });
     }

     save() {
    
       if (this.form.valid) {
        this.form.value.birthdate=moment(this.form.value.birthdate).format('YYYY-MM-DD')
         if (this.form.value.id == 0) {
           this.childService.Post(this.form.value).subscribe(
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
           this.childService.Update(this.form.value).subscribe(
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
