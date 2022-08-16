import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './projects-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ProjectsListComponent]
})
export class ProjectsListModule { }
