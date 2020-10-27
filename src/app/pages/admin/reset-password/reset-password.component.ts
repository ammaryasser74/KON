import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../services/user/auth.service';
import { EmployeeService } from '../../../../services/admin/Employee.service';
import { NbToastrService } from '@nebular/theme';
import { RolesService } from '../../../../services/admin/role.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  id:number;
  passwordNotMatch:any;
  constructor(public myModel: BsModalRef,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private roleService:RolesService,
    private employeeService:EmployeeService,
    private toastr: NbToastrService,) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.form = this.formBuilder.group({
      id: [0],
      current_password:[null, Validators.required],
      new_password:[null, Validators.required],
      new_password_confirmation: [null, Validators.required],
      UserID: [null],
  });
  }
  save(){
    this.form.value.UserID=this.id;
    if (this.form.valid) {
        this.roleService.ChangePassword(this.form.value).subscribe(
          res=>{
             if(res.Success){
               this.toastr.success(res.Message);
               if(this.id==this.authService.currentUser.id){
                 this.authService.LogOut();
               }
               this.myModel.hide();
              }
             else{this.toastr.danger(res.Message);}
          })
    }
    else {
      for (let control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}
