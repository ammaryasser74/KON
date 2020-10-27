import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthService } from '../../../../services/user/auth.service';
import { NbToastrService } from '@nebular/theme';
import { LanguageService } from '../../../../services/language.service';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error:boolean=false;
  myMenu:any[]=[]
  constructor(
    private formBuilder: FormBuilder,
    private notifyService: NbToastrService,
    private translateService: TranslateService,
    private languageService:LanguageService,
    private localStorageService:LocalStorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      LoginField: [null, [Validators.required, Validators.minLength(3)]],
      Password: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  login() {
		if (this.form.valid) { 
			this.loading = true;
			this.authService.Login(this.form.value).subscribe(res=>{
        if(res.Success){
            if (res.Data) {
                this.localStorageService.set('accessToken', res.Data.token);
                this.localStorageService.set('currentUser', res.Data);
                res.Data.permissions.map(i=>i.title=this.languageService.getLanguageOrDefault()=='ar'?i.name_arabic:i.name_english)
                res.Data.permissions.map(i=>i.name_arabic=i.name_arabic)
  
                res.Data.permissions.map(i=>i.link=i.route)
                res.Data.permissions.find(i=>i.id==9).children.map(i=>i.link=i.route);

                res.Data.permissions.find(i=>i.id==9).children.map(i=>i.title=this.languageService.getLanguageOrDefault()=='ar'?i.name_arabic:i.name_english);
                res.Data.permissions.find(i=>i.id==8).children.map(i=>i.link=i.route);

                res.Data.permissions.find(i=>i.id==8).children.map(i=>i.title=this.languageService.getLanguageOrDefault()=='ar'?i.name_arabic:i.name_english);
               
                res.Data.permissions.find(i=>i.id==86).children.map(i=>i.link=i.route);

                res.Data.permissions.find(i=>i.id==86).children.map(i=>i.title=this.languageService.getLanguageOrDefault()=='ar'?i.name_arabic:i.name_english);
               
                res.Data.permissions.forEach(element => {
                  if(element.children.length==0){
                    let obj= {name_ar:element.name_arabic,name_en:element.name_english,title:this.languageService.getLanguageOrDefault()=='ar'?element.name_arabic:element.name_english,link:element.route,icon:element.icon}
                    this.myMenu.push(obj)
                  }
                 else{
                  element.children.forEach(asd => {
                     if(asd.roles.length==0){
                      const index = element.children.indexOf(asd.id);
                      element.children.splice(index, 1);
                     }
                   });
                  let obj= {name_ar:element.name_arabic,name_en:element.name_english,title:this.languageService.getLanguageOrDefault()=='ar'?element.name_arabic:element.name_english,link:element.route,icon:element.icon,children:element.children}
                  this.myMenu.push(obj)
                 }
                 });
                this.error=false;
                 this.localStorageService.set("permissions",  this.myMenu);
                this.localStorageService.set("allpermissions", res.Data.allpermissions);
                if(res.Data.permissions.find(i=>i.id==9)){
                  this.router.navigate(['/admin','dashboard']);
                }
                else
                {
                  this.router.navigate(['/admin','dashboard']);
                  //this.router.navigate([res.Data.permissions[0].route]);
                }
            }
        }
        else{
          this.error=true;
            //  this.notifyService.danger(res.Message,"Error")  
        }
      })
		} else {
			for (let control in this.form.controls) {
				this.form.get(control).markAsDirty();
			}
		}
	}
}
