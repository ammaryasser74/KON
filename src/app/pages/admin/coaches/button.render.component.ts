
import { Component, Input, OnInit } from '@angular/core';

import { ViewCell, Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `
    <button style="color: #77B7D0;
    border: 1px solid #77B7D0;" class="btn"(click)="example(value)">{{'share.show-profile'|translate}}</button>
  `,
})
export class ButtonRenderShowProfileComponent implements OnInit {

  public renderValue;

  @Input() value;

  constructor(private activatedRoute:ActivatedRoute,private router:Router,) {  }

  ngOnInit() {
    this.renderValue = this.value;
  }
  example(id) {
      this.router.navigate(['admin/coach-profile/'+id]);
  }


}
