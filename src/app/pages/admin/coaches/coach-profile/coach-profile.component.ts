
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { CityService } from '../../../../../services/settings/cities.service';
import { CountryService } from '../../../../../services/settings/country.service';
import { LanguageService } from '../../../../../services/language.service';
import { JobService } from '../../../../../services/settings/job.service';;
import { CoachService } from '../../../../../services/admin/coaches.service';
import { ActivatedRoute } from '@angular/router';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { LocalDataSource } from 'ng2-smart-table';
import { AddSessionCaochesComponent } from './add-session/add-session.component';
import { WarningComponent } from '../../../warning/warning.component';
import { CoachSessionService } from '../../../../../services/admin/coachsession.service';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { ExperienceService } from '../../../../../services/admin/experience.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import listDayPlugin from '@fullcalendar/list';
import * as moment from 'moment-timezone';
import { AddAvaliableTimeComponent } from './add-avaliable-time/add-avaliable-time.component';
import { TimeService } from '../../../../../services/admin/avaliabletime.service';
@Component({
  selector: 'ngx-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.scss']
})
export class CoachProfileComponent implements OnInit {
  calendarPlugins = [timeGridPlugin, dayGridPlugin, listDayPlugin];
  form: FormGroup;
  addEditaddressModel: BsModalRef;
  warningModel: BsModalRef;
  fileData=null;
  avater:any;
  jobs:any;
  country:any;
  cities:any;
  onClose: any;
  id:number;
  Data:any;
  loading:boolean
  martial_status:any;
  showJobName:boolean=false;
  avaliableTime;
  options: any;
  settingssession = {
    mode: 'external',
    hideSubHeader: true ,
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      name_arabic: {
        title:this.languageService.getLanguageOrDefault()=='ar'?' اسم المحاضرة':"Session Name",
        type: 'string',
      },
      price: {
        title: this.languageService.getLanguageOrDefault()=='ar'?' سعر المحاضرة ':"Price ",
        type: 'string',
      }
    },
    actions: {
      columnTitle: this.languageService.getLanguageOrDefault()=='ar'?' اجراءات':"Actions ",
      add: false,
      edit: true,
      delete: true,
      position: 'right',
    },
  };


  settingEvent = {
    mode: 'external',
    hideSubHeader: true ,
    actions: false,
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      name_arabic: {
        title:this.languageService.getLanguageOrDefault()=='ar'?' اسم المحاضرة':"Session Name",
        type: 'string',
      },
      max_number: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'   اقصي عدد للحضور ':"max number  ",
        type: 'string',
      },
      no_reserve: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'  عدد الحضور ':"no reserve  ",
        type: 'string',
      },
      price: {
        title:this.languageService.getLanguageOrDefault()=='ar'?' سعر  ':" Price ",
        type: 'string',
      },
      date: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'   التاريخ':"Date ",
        type: 'string',
      },
      time_from: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'   الوقت من ':"From time  ",
        type: 'string',
      },
      time_to: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'  الوقت الي ':"To time  ",
        type: 'string',
      },
    }
   
  };
  settingTime = {
    mode: 'external',
    hideSubHeader: true ,
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      first_name: {
        title:this.languageService.getLanguageOrDefault()=='ar'?' اسم المحاضرة':"Session Name",
        type: 'string',
      },
      online_price: {
        title: this.languageService.getLanguageOrDefault()=='ar'?' سعر المحاضرة الاولاين':"Online Price ",
        type: 'string',
      },
      offline_price: {
        title:this.languageService.getLanguageOrDefault()=='ar'?' سعر المحاضرة الاوف لاين ':"Offline Price ",
        type: 'string',
      },
    },
    actions: {
      columnTitle: this.languageService.getLanguageOrDefault()=='ar'?' اجراءات':"Actions ",
      add: false,
      edit: false,
      delete: true,
      position: 'right',
    },
  };

  settingReservatin = {
    mode: 'external',
    hideSubHeader: true ,
    actions: false,
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      clientName: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'   اسم العميل ':"Client Name   ",
        type: 'string',
      },
      entitytName: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'    المحاضره ':"Session",
        type: 'string',
      },
      date: {
        title:this.languageService.getLanguageOrDefault()=='ar'?' التاريخ ':"Date   ",
        type: 'string',
      },
      time_from: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'   الوقت من ':"From time  ",
        type: 'string',
      },
      time_to: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'  الوقت الي ':"To time  ",
        type: 'string',
      },
      type: {
        title: this.languageService.getLanguageOrDefault()=='ar'?' النوع  ':" Type ",
        type: 'string',
      },
      total_price: {
        title:this.languageService.getLanguageOrDefault()=='ar'?' السعر    ':" Price ",
        type: 'string',
      },
      
    }
  };

  sourceEvent: LocalDataSource = new LocalDataSource();
  sourceSession: LocalDataSource = new LocalDataSource();
  sourcereservation: LocalDataSource = new LocalDataSource();
  sourceTime: LocalDataSource = new LocalDataSource();
  sourceExperience: LocalDataSource = new LocalDataSource();
  sourceExpertises: LocalDataSource = new LocalDataSource();
  sourceCertification: LocalDataSource = new LocalDataSource();
  
  constructor(private formBuilder: FormBuilder, 
    public languageService:LanguageService,
    private http: HttpClient,
    public toasterService:NbToastrService,
    private modalService: BsModalService,
    private cityService:CityService,
    private countryService:CountryService,
    private toastrService: NbToastrService,
    private activeRoute:ActivatedRoute,
    private coachService:CoachService,
    public coachSessionService:CoachSessionService,
    public experienceService:ExperienceService,
    private jobService:JobService,
    public timeService:TimeService
    ) { }

   
    ngOnInit() {
      this.options = {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
  };
      this.initForm();

      this.martial_status=
      [{name:this.languageService.getLanguageOrDefault()=='ar'?'اعزب':"Single",value:1},
      {name:this.languageService.getLanguageOrDefault()=='ar'?'متزوج':"Married",value:2},
      {name:this.languageService.getLanguageOrDefault()=='ar'?'مطلق':"Divorced",value:3}]
      this.jobService.GetList().subscribe(res=>{this.jobs=res.Data})
      this.countryService.Getall().subscribe(res=>{this.country=res.Data;})
      this.getData()
     }
     initForm() {
       this.form = this.formBuilder.group({
         id: [0],
         coach_id:[null],
         first_name: [null],
         last_name: [null, Validators.required],
         phone:[null, [Validators.required]],
         email:[null, Validators.required],
         bio:[null],
         password: [null],
         martial_status:[null],
         gender: [],
         birthdate:[null],
         age:[null],
         avater:[null],
         address:[null, Validators.required],
         country_id :[null, Validators.required],
         city_id:[null, Validators.required],
       });
       this.form.get('country_id').valueChanges.subscribe(country=>{
         this.form.get('city_id').setValue(null)
        this.cityService.GetList(country).subscribe(res=>{this.cities=res.Data})   
       })
     }

     getData(){
       this.loading=true
      this.coachService.GetByID(+this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
        res.Data.bio=res.Data.coach.bio
        res.Data.age=res.Data.coach.age
        res.Data.address=res.Data.coach.address
        res.Data.martial_status=res.Data.coach.martial_status
        res.Data.coach_id=res.Data.coach.id
      
        res.Data.birthdate=res.Data.coach.birthdate;
        this.sourceEvent.load(res.Data.coach.events)
        res.Data.coach.sessions.map(i=>i.price=i.pivot.price)
      //  res.Data.coach.sessions.map(i=>i.offline_price=i.pivot.offline_price)
        this.sourceSession.load(res.Data.coach.sessions)
        this.avaliableTime=res.Data.coach.daytimes.filter(i=>i.availabletimes.length>0)
        res.Data.coach.reservations.map(i=>i.clientName=i.client.user.first_name)
        res.Data.coach.reservations.map(i=>i.entitytName=i.entity.name_arabic)
        console.log(res.Data.coach.reservations);
        
        this.sourcereservation.load(res.Data.coach.reservations);
        res.Data.coach.experiences.map(i=>i.date_from?moment(i.date_from).format('YYYY-MM-DD'):null)
        res.Data.coach.experiences.map(i=>i.date_to?moment(i.date_to).format('YYYY-MM-DD'):null)
        this.sourceExperience.load(res.Data.coach.experiences.filter(i=>i.type=='experiences'))
        this.sourceExpertises.load(res.Data.coach.experiences.filter(i=>i.type=='expertises'))
        this.sourceCertification.load(res.Data.coach.experiences.filter(i=>i.type=='certification'))
        this.avater=res.Data.avater?environment.api_img+res.Data.avater:null
        this.form.patchValue(res.Data)
        this.loading=false
         
        });
    }
     uploadmyImage(Data){
   this.loading=true
      const formData = new FormData();
      formData.append('img', Data);
      this.http.request( new HttpRequest('POST', `${environment.api_url}/UploadImage`,
            formData,
            { reportProgress: true }
          )
        ).subscribe(event => {
          if (event.type === HttpEventType.Response) {
            if (event.body['Success']) {
               this.loading=false
                this.form.get('avater').setValue(event.body['Data'].image);
                this.save()

            } else {
              this.toastrService.danger('something wrong upload again');
            }
          }
        });
    }
  
    addNew(row) {
      this.addEditaddressModel = this.modalService.show(AddSessionCaochesComponent, { initialState:
        {Data: row,coach_id:this.form.value.coach_id
         }, class: 'modal-lg',backdrop: 'static' });
        this.addEditaddressModel.content.onClose  = (res) => {
         this.getData()
        };
    }
    addNewTime(){
      this.addEditaddressModel = this.modalService.show(AddAvaliableTimeComponent, { initialState:
        {coach_id:this.form.value.coach_id
         }, class: 'modal-lg',backdrop: 'static' });
        this.addEditaddressModel.content.onClose  = (res) => {
         this.getData()
        };
    }
    deleteTime(id): void {
      this.warningModel = this.modalService.show(WarningComponent, { class: 'modal-sm' });
      this.warningModel.content.boxObj.msg = this.languageService.getLanguageOrDefault()=='ar'?'انت متاكد من الحذف ؟':'Are you sure you want to delete this  ?';;
      this.warningModel.content.onClose = (cancel) => {
        if (cancel) {
          this.timeService.Delete(id).subscribe(res=>{
            if(res.Success){
              this.warningModel.hide();
              this.toastrService.success(res.Message,"success");
              this.getData()
            }
            else{
              this.toastrService.danger(res.Message,"Error");
            }
          })
        }
      };
    }

    addNewExprience(row,type) {
      this.addEditaddressModel = this.modalService.show(AddExperienceComponent, { initialState:
        {Data: row,coach_id:this.form.value.coach_id,type:type
         }, class: 'modal-lg',backdrop: 'static' });
        this.addEditaddressModel.content.onClose  = (res) => {
         this.getData()
        };
    }
    onDeleteConfirmExprience(event): void {
      this.warningModel = this.modalService.show(WarningComponent, { class: 'modal-sm' });
      this.warningModel.content.boxObj.msg = this.languageService.getLanguageOrDefault()=='ar'?'انت متاكد من الحذف ؟':'Are you sure you want to delete this  ?';;
      this.warningModel.content.onClose = (cancel) => {
        if (cancel) {
          this.experienceService.Delete(event.id).subscribe(res=>{
            if(res.Success){
              this.warningModel.hide();
              this.toastrService.success(res.Message,"success");
              this.getData()
            }
            else{
              this.toastrService.danger(res.Message,"Error");
            }
          })
        }
      };
    }
  
    onDeleteConfirmSession(event): void {
      this.warningModel = this.modalService.show(WarningComponent, { class: 'modal-sm' });
      this.warningModel.content.boxObj.msg = this.languageService.getLanguageOrDefault()=='ar'?'انت متاكد من الحذف ؟':'Are you sure you want to delete this  ?';;
      this.warningModel.content.onClose = (cancel) => {
        if (cancel) {
          this.coachSessionService.Delete(event.data.pivot).subscribe(res=>{
            if(res.Success){
              this.warningModel.hide();
              this.toastrService.success(res.Message,"success");
              this.getData()
            }
            else{
              this.toastrService.danger(res.Message,"Error");
            }
          })
        }
      };
    }

  onSelectFile(event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileData = <File>event.target.files[0];
        this.avater=this.fileData
        reader.onload =(event:any) => {
            this.avater=(event.target.result);
            this.uploadmyImage(this.fileData);
        }
  }}

  save() {
       if (this.form.valid) {
         if (this.form.value.id == 0) {
           this.coachService.Post(this.form.value).subscribe(
             res => {
               if (res.Success) {
                 this.toasterService.success(res.Message,"Sucess");
               } else {
                 this.toasterService.danger(res.Message,"Sucess");
               }
             }
           );
         } else if (this.form.value.id ) {
           this.coachService.Update(this.form.value).subscribe(
             res => {
               if (res.Success) {
                 this.toasterService.success(res.Message);
        
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
