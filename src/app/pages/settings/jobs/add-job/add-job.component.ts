import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { SessionService } from '../../../../../services/admin/session.service';
import { NbToastrService } from '@nebular/theme';
import { JobService } from '../../../../../services/settings/job.service';

@Component({
  selector: 'ngx-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  form: FormGroup;
  id:number;
  onClose: any;
  Data:any;
  constructor(private formBuilder: FormBuilder, 
    public myModel: BsModalRef,
    public jobService:JobService,
    private toastrService: NbToastrService,
    ) { }
  ngOnInit() {
    this.initform()
    if(this.Data){
    this.form.patchValue(this.Data);
    }
  }
initform() {
    this.form = this.formBuilder.group({
      id: [0],
      name_arabic:[null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      name_english:[null, [Validators.required,Validators.pattern('[0-9A-Za-z ]+$')]],
      isactive: [1]
    });
  }

  save() {
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.jobService.Post(this.form.value).subscribe(
          res => {
            if (res.Success) {
              this.toastrService.success(res.Message,"success");
              this.myModel.hide();
              this.onClose();
            } else {
              this.toastrService.danger(res.Message);
            }
          }
        );
      } else if (this.form.value.id > 0 && this.form.dirty) {
        this.jobService.Update(this.form.value).subscribe(
          res => {
            if (res.Success) {
              this.toastrService.success(res.Message,"success");
              this.myModel.hide();
              this.onClose();
            } else {
              this.toastrService.danger(res.Message,"Error");
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
