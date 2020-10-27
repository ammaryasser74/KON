
import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../../@core/data/smart-table';
import { LanguageService } from '../../../../../services/language.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ClientService } from '../../../../../services/admin/client.service';
import { ActivatedRoute } from '@angular/router';
import { WarningComponent } from '../../../warning/warning.component';
import { AddChildernComponent } from './add-childern/add-childern.component';
import { ChildService } from '../../../../../services/admin/children.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CountryService } from '../../../../../services/settings/country.service';
import { CityService } from '../../../../../services/settings/cities.service';
import { JobService } from '../../../../../services/settings/job.service';
import * as moment from 'moment-timezone';
@Component({
  selector: 'ngx-childern',
  templateUrl: './childern.component.html',
  styleUrls: ['./childern.component.scss']
})
export class ChildernComponent implements OnInit {
  name = '';
  Data: any;
  jobs: any
  cities: any
  country: any;
  clientID: any
  loading: boolean
  today = new Date();
  martial_status: any;
  showJobName: boolean = false
  form: FormGroup;
  addEditaddressModel: BsModalRef;
  warningModel: BsModalRef;
  settings = {
    mode: 'external',
    hideSubHeader: true,
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
      name: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'الاسم بالعربي' : "Name Arabic",
        type: 'string',
      },
      age: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'العمر' : "Age",
        type: 'string',
      },
      gender: {
        title: this.languageService.getLanguageOrDefault() == 'ar' ? 'النوع' : "Gender ",
        type: 'string',
      }
    },
    actions: {
      columnTitle: this.languageService.getLanguageOrDefault() == 'ar' ? ' اجراءات' : "Actions ",
      add: false,
      edit: true,
      delete: true,
      position: 'right',
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,

    private clientService: ClientService,
    private activeRoute: ActivatedRoute,
    private modalService: BsModalService,
    private cityService: CityService,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private childService: ChildService,
    private dialogService: NbDialogService,
    public toasterService: NbToastrService,
    private jobService: JobService,
    public languageService: LanguageService) {
  }
  initForm() {
    this.form = this.formBuilder.group({
      id: [0],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      phone: [null, [Validators.required]],
      email: [null, Validators.required],
      type: 'client',
      password: [null],
      martial_status: [null],
      gender: [],
      age: [null],
      birthdate: [null],
      address: [null, Validators.required],
      country_id: [null, Validators.required],
      city_id: [null, Validators.required],
      job: [],
      job_name: [null],
    });
    this.form.get('country_id').valueChanges.subscribe(country => {
      this.form.get('city_id').setValue(null)
      this.cityService.GetList(country).subscribe(res => { this.cities = res.Data })
    })
    this.form.get('job').valueChanges.subscribe(job => {
      if (job == 1)
        (this.showJobName = true)
      else
        this.showJobName = false
    })
  }

  save() {
    if (this.form.valid) {
      this.form.value.birthdate = moment(this.form.value.birthdate).format('YYYY-MM-DD')
      if (this.form.value.id == 0) {
        this.clientService.Post(this.form.value).subscribe(
          res => {
            if (res.Success) {
              this.toasterService.success(res.Message, "Sucess");
              ;
            } else {
              this.toasterService.danger(res.Message, "Error");
            }
          }
        );
      } else if (this.form.value.id > 0) {
        this.clientService.Update(this.form.value).subscribe(
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
  onEdit(e) {
    this.addEditaddressModel = this.modalService.show(AddChildernComponent, {
      initialState:
        { Data: e.data, }, class: 'modal-lg', backdrop: 'static'
    });
    this.addEditaddressModel.content.onClose = (res) => {
      this.getData()
    };
  }

  onDeleteConfirm(event): void {
    this.warningModel = this.modalService.show(WarningComponent, { class: 'modal-sm' });
    this.warningModel.content.boxObj.msg = this.languageService.getLanguageOrDefault() == 'ar' ? 'انت متاكد من الحذف ؟' : 'Are you sure you want to delete this  ?';
    this.warningModel.content.onClose = (cancel) => {
      if (cancel) {
        this.childService.Delete(event.data.id).subscribe(res => {
          if (res.Success) {
            this.warningModel.hide();
            this.toasterService.success(res.Message, "success");
            this.getData()
          }
          else {
            this.toasterService.danger(res.Message, "Error");
          }
        })
      }
    };
  }

  getData() {
    this.loading=true
    this.clientService.GetByID(+this.activeRoute.snapshot.paramMap.get('id')).subscribe(res => {
      this.source.load(res.Data.client.children);
      this.Data = res.Data;
      this.clientID = res.Data.client.id
      // clientData 
      this.loading=false
      console.log(res.Data,"LLL");
      res.Data.address=res.Data.client.address;
      res.Data.firs_tname=res.Data.first_name;
      res.Data.birthdate=res.Data.client.birthdate;
      res.Data.last_name=res.Data.last_name;
      res.Data.city_id=res.Data.city_id;
      res.Data.country_id=res.Data.country_id;
      res.Data.job=res.Data.client.job;
      res.Data.martial_status=res.Data.client.martial_status
      res.Data.age=res.Data.client.age
      this.form.patchValue(res.Data)

    })
  }
  addNew() {
    this.clientID
    this.addEditaddressModel = this.modalService.show(AddChildernComponent, {
      initialState:
        { Data: null, clientID: this.clientID }, class: 'modal-lg', backdrop: 'static'
    });
    this.addEditaddressModel.content.onClose = (res) => {
      this.getData()
    };
  }


  filter(filter: string) {
    if (filter.length) {
      const asd = (this.Data.filter(i => {
        let name_arabic = i.name_arabic;
        let description_arabic = i.description_arabic;
        let name_english = i.name_english;
        let description_eglish = i.description_eglish;

        return `${name_arabic ? name_arabic.toLowerCase() : ''}
          ${description_arabic ? description_arabic.toLowerCase() : ''}
          ${name_english ? name_english.toLowerCase() : ''}
          ${description_eglish ? description_eglish.toLowerCase() : ''}

          `.indexOf(filter.toLowerCase()) !== -1;
      }))
      this.source.load(asd);
    }
    else {
      this.source.load(this.Data);
    }
  }
  ngOnInit() {
    this.martial_status =
      [
        { name: this.languageService.getLanguageOrDefault() == 'ar' ? 'اعزب' : "Single", value: 1 },
        { name: this.languageService.getLanguageOrDefault() == 'ar' ? 'متزوج' : "Married", value: 2 },
        { name: this.languageService.getLanguageOrDefault() == 'ar' ? 'مطلق' : "Divorced", value: 3 }]
    this.jobService.GetList().subscribe(res => { this.jobs = res.Data })
    this.countryService.Getall().subscribe(res => { this.country = res.Data; })
    this.initForm();
    this.getData();
   
  }
}
