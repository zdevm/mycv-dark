import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './projects-list.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    RouterModule
  ],
  exports: [ProjectsListComponent]
})
export class ProjectsListModule { }
