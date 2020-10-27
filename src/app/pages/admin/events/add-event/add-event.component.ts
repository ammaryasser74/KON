
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { SessionService } from '../../../../../services/admin/session.service';
import { NbToastrService } from '@nebular/theme';
import { EventService } from '../../../../../services/admin/event.service';
import { CoachService } from '../../../../../services/admin/coaches.service';
import { LanguageService } from '../../../../../services/language.service';
import * as moment from 'moment-timezone';
import { Time} from '@angular/common';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'ngx-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  URLrouters: any[] = this.router.url.split('/');
  mytime: Time;
  mytimeTo:Time
  form: FormGroup;
  id:number;
  onClose: any;
  coaches:any;
  Data:any;
  fileData=null;
  img:any;
  constructor(private formBuilder: FormBuilder, 
    private activeRoute: ActivatedRoute,
    public eventService:EventService,
    private toastrService: NbToastrService,
    public coachService:CoachService,
    private http: HttpClient,
    private router:Router,
    public languageService:LanguageService
    ) { }
  ngOnInit() {
    this.coachService.GetList().subscribe(res=>{this.coaches=res.Data})
    this.initform()
    if(+this.activeRoute.snapshot.paramMap.get('id') > 0){
       this.eventService.GetByID(+this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
        this.img=res.Data.img?environment.api_img+'/'+res.Data.img:null
        this.mytime=res.Data.time_from
        this.mytimeTo=res.Data.time_to
      this.form.patchValue(res.Data);
       })
     
    }
  }
  public changed(): void {
    this.mytime = moment(this.form.value.time_from).format('hh:mm:ss')
}
public changedto(): void {
  this.mytimeTo = moment(this.form.value.time_to).format('hh:mm:ss')
}


initform() {
    this.form = this.formBuilder.group({
      id: [0],
      name_arabic:[null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      name_english:[null, [Validators.required,Validators.pattern('[0-9A-Za-z ]+$')]],
      description_arabic:[null],
      description_english:[null],
      coach_id:[null, [Validators.required]],
      price:[null, [Validators.required]],
      max_number:[null, [Validators.required]],
      type:['online', [Validators.required]],
      address:[null],
      date:[null, [Validators.required]],
      time_from: [null, Validators.required],
      time_to:[null, [Validators.required]],
      img:[null]
    });
    
  }

  save() {
    if (this.form.valid) {
      this.form.value.date=moment(this.form.value.date).format('YYYY-MM-DD hh:mm:ss')
      this.form.value.time_from=moment(this.form.value.time_from).format('hh:mm:ss')
      this.form.value.time_to=moment(this.form.value.time_to).format('hh:mm:ss')
      
      if (this.form.value.id == 0) {
        this.eventService.Post(this.form.value).subscribe(
          res => {
            if (res.Success) {
              this.toastrService.success(res.Message,"success");
              this.URLrouters.splice(-1, 1)
              this.router.navigateByUrl(this.URLrouters.join('/'));
            } else {
              this.toastrService.danger(res.Message);
            }
          }
        );
      } else if (this.form.value.id > 0 ) {
        this.form.value.time_from=this.mytime
        this.form.value.time_to=this.mytimeTo
        this.eventService.Update(this.form.value).subscribe(
          res => {
            if (res.Success) {
              this.toastrService.success(res.Message,"success");
              this.URLrouters.splice(-1, 1)
    this.router.navigateByUrl(this.URLrouters.join('/'));
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
