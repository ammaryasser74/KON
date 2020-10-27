import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { PartnerService } from '../../../../../services/settings/partner.service';
import { StoryService } from '../../../../../services/settings/story.service';



@Component({
  selector: 'ngx-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.scss']
})
export class AddStoryComponent implements OnInit {

  form: FormGroup;
  id:number;
  onClose: any;
  Data:any;
  constructor(private formBuilder: FormBuilder, 
    public myModel: BsModalRef,
    public storyService:StoryService,
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
      title_arabic:[null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      title_english:[null, [Validators.required,Validators.pattern('[0-9A-Za-z ]+$')]],
      description_arabic:[null],
      description_english:[null],
    });
  }

  save() {
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.storyService.Post(this.form.value).subscribe(
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
        this.storyService.Update(this.form.value).subscribe(
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
