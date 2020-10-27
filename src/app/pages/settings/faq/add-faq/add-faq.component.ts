import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { PartnerService } from '../../../../../services/settings/partner.service';
import { StoryService } from '../../../../../services/settings/story.service';
import { FAQService } from '../../../../../services/settings/faq.service';



@Component({
  selector: 'ngx-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {

  form: FormGroup;
  id:number;
  onClose: any;
  Data:any;
  constructor(private formBuilder: FormBuilder, 
    public myModel: BsModalRef,
    public fAQService:FAQService,
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
      question_arabic:[null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      answer_arabic:[null, [Validators.required,Validators.pattern('[0-9A-Za-z ]+$')]],
      question_english:[null],
      answer_english:[null],
    });
  }

  save() {
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.fAQService.Post(this.form.value).subscribe(
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
        this.fAQService.Update(this.form.value).subscribe(
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
