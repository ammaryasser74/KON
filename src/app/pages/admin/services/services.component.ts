import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {SessionService} from '../../../../services/admin/session.service'
import { SmartTableData } from '../../../@core/data/smart-table';
import { LanguageService } from '../../../../services/language.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { WarningComponent } from '../../warning/warning.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { ServiceService } from '../../../../services/admin/service.service';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name_arabic: string;
  name_english: string;
  description_arabic: string;
  description_english?: number;
}

@Component({
  selector: 'ngx-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  customColumn = 'name_arabic';
  defaultColumns = ['name_english', 'description_arabic','description_english' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  dataSource: NbTreeGridDataSource<FSEntry>;
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
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
      name_arabic: {
        title:this.languageService.getLanguageOrDefault()=='ar'?'الاسم بالعربي':"Name Arabic",
        type: 'string',
      },
      name_english: {
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
      delete: true,
      position: 'right',
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,
    private toastrService: NbToastrService,
    private modalService: BsModalService,
    private serviceService:ServiceService,
    private dialogService:NbDialogService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private languageService:LanguageService) {
  }

  onEdit(e){
    this.addEditaddressModel = this.modalService.show(AddServiceComponent, { initialState:
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
        this.serviceService.Delete(event.data.id).subscribe(res=>{
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
    this.serviceService.GetList().subscribe(res=>{this.source.load(res.Data);this.Data=res.Data;;
      this.dataSource = this.dataSourceBuilder.create(res.Data);

    });
  }
  addNew() {
    this.addEditaddressModel = this.modalService.show(AddServiceComponent, { initialState:
      {Data: null, }, class: 'modal-lg',backdrop: 'static' });
      this.addEditaddressModel.content.onClose  = (res) => {
       this.getData()
      };
  }
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  filter(filter: string) {
    if (filter.length) {
      const asd=(this.Data.filter(i => {
          let name_arabic =  i.name_arabic ;
          let description_arabic =  i.description_arabic;
          let name_english =   i.name_english ;
          let description_eglish =  i.description_eglish;

          return `${name_arabic ? name_arabic.toLowerCase() : ''}
          ${description_arabic ? description_arabic.toLowerCase() : ''}
          ${name_english ? name_english.toLowerCase() : ''}
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
  @Component({
    selector: 'ngx-fs-icon',
    template: `
      <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
      </nb-tree-grid-row-toggle>
      <ng-template #fileIcon>
        <nb-icon icon="file-text-outline"></nb-icon>
      </ng-template>
    `,
  })
  export class FsIconComponent {
    @Input() name_arabic: string;
    @Input() expanded: boolean;
  
    isDir(): boolean {
      return this.name_arabic === 'dir';
    }
}
