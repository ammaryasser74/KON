

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { LanguageService } from '../../../../../../services/language.service';
import { SessionService } from '../../../../../../services/admin/session.service';
import { ActivatedRoute } from '@angular/router';
import { CoachSessionService } from '../../../../../../services/admin/coachsession.service';
@Component({
  selector: 'ngx-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionCaochesComponent implements OnInit {
  @Input() coach_id
  form: FormGroup;
  sessions:any;
  onClose: any;
  id:number;
  @Input() Data:any;

  constructor(private formBuilder: FormBuilder, 
    public languageService:LanguageService,
    public activeRoute:ActivatedRoute,
    public myModel: BsModalRef,
    public toasterService:NbToastrService,
    public sessionService:SessionService,
    public coachSessionService:CoachSessionService
    ) { }
    ngOnInit() {
      this.sessionService.GetList().subscribe(res=>{this.sessions=res.Data})
       this.initForm();
       if(this.Data){
         this.form.patchValue(this.Data.data.pivot)
       }
       
     }
     initForm() {
       this.form = this.formBuilder.group({
         id: [0],
         coach_id:this.coach_id,
         session_id: [null,Validators.required],
         price: [null, Validators.required],
         online_price: [0],
         offline_price:[0],
       })

     }

     save() {
       if (this.form.valid) {
         if (this.form.value.id == 0) {
           this.coachSessionService.Post(this.form.value).subscribe(
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


