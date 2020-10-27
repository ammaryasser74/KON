
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { CityService } from '../../../../../services/settings/cities.service';
import { CountryService } from '../../../../../services/settings/country.service';
import { LanguageService } from '../../../../../services/language.service';
import { JobService } from '../../../../../services/settings/job.service';;
import { CoachService } from '../../../../../services/admin/coaches.service';
import * as moment from 'moment-timezone';
@Component({
  selector: 'ngx-add-coach',
  templateUrl: './add-coach.component.html',
  styleUrls: ['./add-coach.component.scss']
})
export class AddCoachComponent implements OnInit {
  form: FormGroup;
  jobs:any;
  country:any;
  cities:any;
  onClose: any;
  id:number;
  today = new Date();
  Data:any;
  martial_status:any;
  showJobName:boolean=false
  constructor(private formBuilder: FormBuilder, 
    public languageService:LanguageService,
    public myModel: BsModalRef,
    public toasterService:NbToastrService,
    private cityService:CityService,
    private countryService:CountryService,
    private coachService:CoachService,
    private jobService:JobService,
    ) { }
    ngOnInit() {
      this.martial_status=
      [
        {name:this.languageService.getLanguageOrDefault()=='ar'?'اعزب':"Single",value:1},
        {name:this.languageService.getLanguageOrDefault()=='ar'?'متزوج':"Married",value:2},
        {name:this.languageService.getLanguageOrDefault()=='ar'?'مطلق':"Divorced",value:3}]
      this.jobService.GetList().subscribe(res=>{this.jobs=res.Data})
      this.countryService.Getall().subscribe(res=>{this.country=res.Data;})
      this.initForm();
       if(this.Data){
         this.Data.address=this.Data.client.address;
         this.Data.firs_tname=this.Data.first_name;
         this.Data.last_name=this.Data.last_name;
         this.Data.city_id=this.Data.city_id;
         this.Data.country_id=this.Data.country_id;
     
         this.Data.martial_status=this.Data.client.martial_status
         this.Data.age=this.Data.client.age
         this.form.patchValue(this.Data)
       }
       
     }
     initForm() {
       this.form = this.formBuilder.group({
         id: [0],
         first_name: [null],
         last_name: [null, Validators.required],
         phone:[null, [Validators.required]],
         email:[null, Validators.required],
         bio:[null],
         password: [null],
         martial_status:[null],
         gender: [],
         age:[null],
         birthdate:[null],
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
        this.form.value.birthdate=moment(this.form.value.birthdate).format('YYYY-MM-DD')
         if (this.form.value.id == 0) {
           this.coachService.Post(this.form.value).subscribe(
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
           this.coachService.Update(this.form.value).subscribe(
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
