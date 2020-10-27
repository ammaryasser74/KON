
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { LanguageService } from '../../../../../../services/language.service';
import { SessionService } from '../../../../../../services/admin/session.service';
import { ActivatedRoute } from '@angular/router';
import { CoachSessionService } from '../../../../../../services/admin/coachsession.service';
import { TimeService } from '../../../../../../services/admin/avaliabletime.service';
import * as moment from 'moment-timezone';
@Component({
  selector: 'ngx-add-avaliable-time',
  templateUrl: './add-avaliable-time.component.html',
  styleUrls: ['./add-avaliable-time.component.scss']
})
export class AddAvaliableTimeComponent implements OnInit {
  @Input() coach_id
  form: FormGroup;
  Days:any;
  onClose: any;
  id:number;
  @Input() Data:any;

  constructor(private formBuilder: FormBuilder, 
    public languageService:LanguageService,
    public activeRoute:ActivatedRoute,
    public myModel: BsModalRef,
    public toasterService:NbToastrService,
    public sessionService:SessionService,
    public timeService:TimeService,
    public coachSessionService:CoachSessionService
    ) { }
    ngOnInit() {
      this.sessionService.Days().subscribe(res=>{this.Days=res.Data})
       this.initForm();
       if(this.Data){
         this.form.patchValue(this.Data.data.pivot)
       }
       
     }
     initForm() {
       this.form = this.formBuilder.group({
         id: [0],
         coach_id:this.coach_id,
         day_id: [null,Validators.required],
         time_from: [null, Validators.required],
         time_to:[null, [Validators.required]],
       })

     }

     save() {
      this.form.value.time_from=moment(this.form.value.time_from).format('hh:mm:ss')
      this.form.value.time_to=moment(this.form.value.time_to).format('hh:mm:ss')
       if (this.form.valid) {
         if (this.form.value.id == 0) {
           this.timeService.Post(this.form.value).subscribe(
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
         } 
       }
       else {
         for (let control in this.form.controls) {
           this.form.get(control).markAsDirty();
         }
       }
     }
}