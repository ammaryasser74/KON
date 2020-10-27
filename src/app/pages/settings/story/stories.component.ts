
import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { LanguageService } from '../../../../services/language.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WarningComponent } from '../../warning/warning.component';

import { PartnerService } from '../../../../services/settings/partner.service';
import { AddStoryComponent } from './add-story/add-story.component';
import { StoryService } from '../../../../services/settings/story.service';

@Component({
  selector: 'ngx-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
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
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      title_arabic: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'الاسم بالعربي':"Name Arabic",
        type: 'string',
      },
      title_english: {
        title: this.languageService.getLanguageOrDefault()=='ar'?'الاسم بالانجليزي':"Name English",
        type: 'string',
      },
      description_arabic: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'الوصف بالانجليزي':"Description Arabic",
        type: 'string',
      },
      description_english: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'الوصف بالانجليزي':"Description English",
        type: 'string',
      }
    },
    actions: {
      columnTitle: this.languageService.getLanguageOrDefault()=='ar'?' اجراءات':"Actions ",
      add: false,
      edit: true,
      delete: false,
      position: 'right',
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,
    private toastrService: NbToastrService,
    private modalService: BsModalService,
    private storyService:StoryService,
    private dialogService:NbDialogService,
    private languageService:LanguageService) {
  }

  onEdit(e){
    this.addEditaddressModel = this.modalService.show(AddStoryComponent, { initialState:
      {Data: e.data, }, class: 'modal-lg',backdrop: 'static' });
      this.addEditaddressModel.content.onClose  = (res) => {
       this.getData()
      };
  }

  onDeleteConfirm(event): void {
    this.warningModel = this.modalService.show(WarningComponent, { class: 'modal-sm' });
    this.warningModel.content.boxObj.msg = this.languageService.getLanguageOrDefault()=='ar'?'انت متاكد من الحذف ؟':'Are you sure you want to delete this  ?';;
    this.warningModel.content.onClose = (cancel) => {
      if (cancel) {
        this.storyService.Delete(event.data.id).subscribe(res=>{
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
    this.storyService.GetList().subscribe(res=>{this.source.load(res.Data);this.Data=res.Data;;
    });
  }
  addNew() {
    this.addEditaddressModel = this.modalService.show(AddStoryComponent, { initialState:
      {Data: null, }, class: 'modal-lg',backdrop: 'static' });
      this.addEditaddressModel.content.onClose  = (res) => {
       this.getData()
      };
  }


  filter(filter: string) {
    if (filter.length) {
      const asd=(this.Data.filter(i => {
          let title_arabic =  i.title_arabic ;
          let description_arabic =  i.description_arabic;
          let title_english =   i.title_english ;
          let description_eglish =  i.description_eglish;

          return `${title_arabic ? title_arabic.toLowerCase() : ''}
          ${description_arabic ? description_arabic.toLowerCase() : ''}
          ${title_english ? title_english.toLowerCase() : ''}
          ${description_eglish ? description_eglish.toLowerCase() : ''}

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
