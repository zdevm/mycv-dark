import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkExpComponent } from './work-exp.component';
import { JobCardModule } from './components/job-card/job-card.module';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    WorkExpComponent
  ],
  imports: [
    CommonModule,
    JobCardModule,
    SwiperModule
  ],
  exports: [WorkExpComponent]
})
export class WorkExpModule { }
