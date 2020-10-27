import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {
  warn:string=this.languageService.getLanguageOrDefault()=='ar'?'تحذير':'Warning';
  onClose: any;
  boxObj: {msg?: string, yes?: string, no?: string} = {
    msg: 'Are you sure?', yes: this.languageService.getLanguageOrDefault()=='ar'?'نعم':'yes', no: this.languageService.getLanguageOrDefault()=='ar'?'لأ':'No',
  };

  constructor(public warningModel: BsModalRef,
    private languageService:LanguageService) { }

  ngOnInit() {
  }
}
