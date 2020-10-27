

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { SessionService } from '../../../../../services/admin/session.service';
import { NbToastrService } from '@nebular/theme';
import { RolesService } from '../../../../../services/admin/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../../../../services/language.service';

@Component({
  selector: 'ngx-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
 
  form: FormGroup;
  id:number;
  onClose: any;
  Data:any;
  permission:any=[];
  loading:boolean=false;
  permissionEdit:any=[];
  RolebyId:any;
  permissionSelect:any=[];
  constructor(private formBuilder: FormBuilder, 
    public rolesService:RolesService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastrService: NbToastrService,
    public languageService:LanguageService
    ) { }
  ngOnInit() {
    this.initform();
    this.getData();
  
  }
  
  getData(){
    if(+this.activeRoute.snapshot.paramMap.get('id')>0){
      this.rolesService.GetByID(+this.activeRoute.snapshot.paramMap.get('id')).subscribe(myres=>{
        this.RolebyId=myres.Data;
        this.form.patchValue(this.RolebyId);
        this.form.get('RoleID').setValue(this.RolebyId.id);
        this.rolesService.Permission().subscribe(res=>{
          res.Data.map(i=>i.children.map(i=>i.active=false))
        this.RolebyId.permissions.forEach(element => {
        this.permissionSelect.push(element.id);
        this.form.get('permissions').setValue(this.permissionSelect);
          //check
          let ExsitID= res.Data.find(i=>i.children.find(i=>i.id==element.id));
        if(ExsitID.children.find(i=>i.id==element.id).id==element.id){
          res.Data.find(i=>i.id==ExsitID.id).children.filter(i=>i.id==element.id).map(i=>i.active=true)}
        });
     
        this.permission=res.Data;
      })
    })
  }
    else{
      this.rolesService.Permission().subscribe(res=>{
        res.Data.map(i=>i.children.map(i=>i.active=false))
        this.permission=res.Data;
        
      })
    }
  }
  permissionadd(e,id){
    if(this.permissionSelect.length==0){
      this.permissionSelect.push(id);
      this.form.get('permissions').setValue(this.permissionSelect)
    }
    else{
      let index =this.permissionSelect.indexOf(id);
      if(index==-1){
        this.permissionSelect.push(id);
        this.form.get('permissions').setValue(this.permissionSelect)
      }
      else{
        this.permissionSelect.splice(index,1);
       this.form.get('permissions').setValue(this.permissionSelect)
      }
    }
  }
initform() {
    this.form = this.formBuilder.group({
      id: [0],
      permissions:[],
      RoleID: [0],
      name_arabic:[null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      name_english:[null, [Validators.required,Validators.pattern('[0-9A-Za-z ]+$')]],
      description_arabic:[null],
      description_english:[null],
      isactive: [1]
    });
  }

  save() {
    if(this.form.value.permissions==null){
      this.toastrService.danger('يجب ان تختار علي الاقل اذن واحد');
    }
    else if(this.form.value.permissions.length==0){
      this.toastrService.danger('يجب ان تختار علي الاقل اذن واحد');
    }
    if (this.form.valid) {
      if (this.form.value.id == 0) {
        this.rolesService.Post(this.form.value).subscribe(
          res => {
            if (res.Success) {
              this.toastrService.success(res.Message,"success");
              this.router.navigate(['admin/roles']);
            } else {
              this.toastrService.danger(res.Message);
            }
          }
        );
      } else if (this.form.value.id > 0 && this.form.dirty) {
        this.rolesService.Update(this.form.value).subscribe(
          res => {
            if (res.Success) {
              this.toastrService.success(res.Message,"success");
              this.router.navigate(['admin/roles']);
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
