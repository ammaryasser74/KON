import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { PartnerService } from '../../../../../services/settings/partner.service';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ngx-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {
  fileData=null;
  img:any;
  form: FormGroup;
  id:number;
  onClose: any;
  Data:any;
  constructor(private formBuilder: FormBuilder, 
    public myModel: BsModalRef,
    public partnerService:PartnerService,
    private toastrService: NbToastrService,
    private http: HttpClient,
    ) { }
  ngOnInit() {
    this.initform()
    if(this.Data){
    this.img=this.Data.img!=null?environment.api_img+this.Data.img:null
    this.form.patchValue(this.Data);
    }
  }
initform() {
    this.form = this.formBuilder.group({
      id: [0],
      name_arabic:[null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      name_english:[null, [Validators.required,Validators.pattern('[0-9A-Za-z ]+$')]],
      img:[],
      isactive: [1]
    });
  }

  uploadmyImage(Data){
    const formData = new FormData();
    formData.append('img', Data);
    this.http.request( new HttpRequest('POST', `${environment.api_url}/UploadImage`,
          formData,
          { reportProgress: true }
        )
      ).subscribe(event => {
        if (event.type === HttpEventType.Response) {
          if (event.body['Success']) {
              this.form.get('img').setValue(event.body['Data'].image);
          } else {
            this.toastrService.danger('something wrong upload again');
          }
        }
      });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.fileData = <File>event.target.files[0];
      this.img=this.fileData
      reader.onload =(event:any) => {
          this.img=(event.target.result);
          this.uploadmyImage(this.fileData);
      }
}}
  save() {
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.partnerService.Post(this.form.value).subscribe(
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
        this.partnerService.Update(this.form.value).subscribe(
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
