import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanizeDurationPipe } from './humanize-duration.pipe';



@NgModule({
  declarations: [HumanizeDurationPipe],
  imports: [
    CommonModule
  ],
  exports: [HumanizeDurationPipe]
})
export class HumanizeDurationModule { }
