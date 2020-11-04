import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningComponent } from './warning.component';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    NbButtonModule
  ],
  exports: [WarningComponent],
  declarations: [WarningComponent],
  entryComponents: [WarningComponent]
})
export class WarningModule { }
