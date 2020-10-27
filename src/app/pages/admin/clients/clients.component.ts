
import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { LanguageService } from '../../../../services/language.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WarningComponent } from '../../warning/warning.component';
import { ClientService } from '../../../../services/admin/client.service';
import { AddClientComponent } from './add-client/add-client.component';
import { ButtonRenderComponent } from './button.render.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  name='';
  Data:any;
  addEditaddressModel: BsModalRef;
  warningModel: BsModalRef;
  settings = {
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
        title:this.languageService.getLanguageOrDefault()=='ar'?'الاسم الأول':"First Name ",
        type: 'string',
      },
      last_name: {
        title: this.languageService.getLanguageOrDefault()=='ar'?'الاسم الاخير':"Last Name ",
        type: 'string',
      },
      phone: {
        title:this.languageService.getLanguageOrDefault()=='ar'?' الهاتف':"Phone ",
        type: 'string',
      },
      email: {
        title:this.languageService.getLanguageOrDefault()=='ar'?' البريد الالكتروني':"Email ",
        type: 'string',
      },
      id: {
        title: this.languageService.getLanguageOrDefault()=='ar'?'الاطفال':"Children ",
        type: 'custom',
        renderComponent: ButtonRenderComponent,
        defaultValue: 'a8'
      },
    },
    actions: {
      columnTitle: this.languageService.getLanguageOrDefault()=='ar'?' اجراءات':"Actions ",
       add: false,
       edit: false,
      delete: true,
     position: 'right',
   }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,
    private toastrService: NbToastrService,
    private modalService: BsModalService,
    private clientService:ClientService,
    private dialogService:NbDialogService,
    private languageService:LanguageService) {
  }

  onEdit(e){
    this.addEditaddressModel = this.modalService.show(AddClientComponent, { initialState:
      {Data: e.data, }, class: 'modal-lg',backdrop: 'static' });
      this.addEditaddressModel.content.onClose  = (res) => {
       this.getData()
      };
  }
  Export() {
    this.clientService.Export().subscribe(res => {
      let path = res.Data;
      window.open(`${environment.api_img}${path}`);
    });
  }
  onDeleteConfirm(event): void {
    this.warningModel = this.modalService.show(WarningComponent, { class: 'modal-sm' });
    this.warningModel.content.boxObj.msg = this.languageService.getLanguageOrDefault()==='ar' ? 'انت متاكد من الحذف ؟':'Are you sure you want to delete this  ?';
    this.warningModel.content.onClose = (cancel) => {
      if (cancel) {
        this.clientService.Delete(event.data.id).subscribe(res=>{
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

  getData(){
    this.clientService.GetList().subscribe(res=>
      {
       
        this.source.load(res.Data);this.Data=res.Data;;
      });
  }
  addNew() {
    this.addEditaddressModel = this.modalService.show(AddClientComponent, { initialState:
      {Data: null, }, class: 'modal-lg',backdrop: 'static' });
      this.addEditaddressModel.content.onClose  = (res) => {
       this.getData()
      };
  }

  filter(filter: string) {
    if (filter.length) {
      const asd=(this.Data.filter(i => {
          let first_name =  i.first_name ;
          let last_name =  i.last_name;
          let phone =   i.phone ;
          let email =  i.email;

          return `${first_name ? first_name.toLowerCase() : ''}
          ${last_name ? last_name.toLowerCase() : ''}
          ${phone ? phone.toLowerCase() : ''}
          ${email ? email.toLowerCase() : ''}

          `.indexOf(filter.toLowerCase()) !== -1;
        }))
        this.source.load(asd);
      }
      else{
        this.source.load(this.Data);
      }
  }
  ngOnInit(){
    this.getData();
  }
}

