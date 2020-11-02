
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { SessionService } from '../../../../../services/admin/session.service';
import { environment } from '../../../../../environments/environment';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { ServiceService } from '../../../../../services/admin/service.service';
import { LanguageService } from '../../../../../services/language.service';
import { PackagesService } from '../../../../../services/admin/packages.service';
@Component({
  selector: 'app-add-packages',
  templateUrl: './add-packages.component.html',
  styleUrls: ['./add-packages.component.scss']
})
export class AddPackagesComponent implements OnInit {
  fileData=null;
  img:any;
  allservices:[]
  form: FormGroup;
  id:number;
  onClose: any;
  Data:any;
  loading:boolean
  constructor(private formBuilder: FormBuilder, 
    public myModel: BsModalRef,
    public serviceService:ServiceService,
    public languageService:LanguageService,
    public PackagesService:PackagesService,
    private toastrService: NbToastrService,
    private http: HttpClient,
    ) { }
  ngOnInit() {
    this.serviceService.GetTree().subscribe(res=>{this.allservices=res.Data})
    this.initform()
    if(this.Data){
      this.img=this.Data.img?environment.api_img+this.Data.img:null
    this.form.patchValue(this.Data);
    }
  }
initform() {
    this.form = this.formBuilder.group({
      id: [0],
      name_arabic:[null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      name_english:[null, [Validators.required,Validators.pattern('[0-9A-Za-z ]+$')]],
      description_arabic:[null],
      description_english:[null],
      isactive: [1],
      service_id:[null],
      img:[]
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
  uploadmyImage(Data){
    this.loading=true
    const formData = new FormData();
    formData.append('img', Data);
    this.http.request(
        new HttpRequest(
          'POST',
          `${environment.api_url}/UploadImage`,
          formData,
          { reportProgress: true }
        )
      ).subscribe(event => {
        if (event.type === HttpEventType.Response) {
          if (event.body['Success']) {
            this.loading=false
              this.form.get('img').setValue(event.body['Data'].image);
          
          } else {
            this.toastrService.danger('something wrong upload again');
          }
        }
      });
  }
  save() {
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.PackagesService.Post(this.form.value).subscribe(
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
      } else if (this.form.value.id > 0 ) {
        this.PackagesService.Update(this.form.value).subscribe(
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
