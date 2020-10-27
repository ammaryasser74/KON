
  import { Component, OnInit, Input } from '@angular/core';
  import { FormGroup, Validators, FormBuilder } from '@angular/forms';
  import { BsModalRef } from 'ngx-bootstrap';
  import { NbToastrService } from '@nebular/theme';
  import { LanguageService } from '../../../../../../services/language.service';
  import { SessionService } from '../../../../../../services/admin/session.service';
  import { ActivatedRoute } from '@angular/router';
  import { CoachSessionService } from '../../../../../../services/admin/coachsession.service';
import { ExperienceService } from '../../../../../../services/admin/experience.service';

  @Component({
    selector: 'ngx-add-experience',
    templateUrl: './add-experience.component.html',
    styleUrls: ['./add-experience.component.scss']
  })
  export class AddExperienceComponent implements OnInit {
    @Input() coach_id
    @Input () type
    form: FormGroup;
    sessions:any;
    onClose: any;
    id:number;
    today = new Date();
    isCurrent:boolean
    @Input() Data:any;
  
    constructor(private formBuilder: FormBuilder, 
      public languageService:LanguageService,
      public activeRoute:ActivatedRoute,
      public myModel: BsModalRef,
      public toasterService:NbToastrService,

      public experienceService:ExperienceService
      ) { }
      ngOnInit() {
         this.isCurrent=false
         this.initForm();
         if(this.Data){
           console.log(this.Data,";;;")
           this.isCurrent=this.Data.iscurrent
           this.form.patchValue(this.Data)
         }
         
       }
       initForm() {
         this.form = this.formBuilder.group({
           id: [0],
           coach_id:this.coach_id,
           name_arabic: [null, Validators.required],
           name_english:[null, Validators.required],
           description_arabic: [null, Validators.required],
           description_english:[null, Validators.required],
           type:this.type,
           date_from: [null],
           date_to:[null],
           iscurrent:[false]
         })
       }
       checkValue(event){
         if(event.target.checked){
           this.form.get('date_to').setValue(null)
         }
         this.isCurrent=event.target.checked
        console.log(event.target.checked,";;;;")
       }
       save() {
         if (this.form.valid) {
              if(this.form.value.id==0){
                this.experienceService.Post(this.form.value).subscribe(
                  res => {
                    if (res.Success) {
                      this.toasterService.success(res.Message,"Sucess");
                      this.myModel.hide();
                      this.onClose();
                    } else {
                      this.toasterService.danger(res.Message,"Sucess");
                    }
                  });
              }
              else{
                this.experienceService.update(this.form.value).subscribe(
                  res => {
                    if (res.Success) {
                      this.toasterService.success(res.Message,"Sucess");
                      this.myModel.hide();
                      this.onClose();
                    } else {
                      this.toasterService.danger(res.Message,"Sucess");
                    }
                  });
              }
            
         }
         else {
           for (let control in this.form.controls) {
             this.form.get(control).markAsDirty();
           }
         }
       }
  }