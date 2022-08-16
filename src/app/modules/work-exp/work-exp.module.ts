import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkExpComponent } from './work-exp.component';
import { JobCardModule } from './components/job-card/job-card.module';



@NgModule({
  declarations: [
    WorkExpComponent
  ],
  imports: [
    CommonModule,
    JobCardModule
  ],
  exports: [WorkExpComponent]
})
export class WorkExpModule { }
