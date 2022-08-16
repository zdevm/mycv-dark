import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeModule } from '@modules/about-me/about-me.module';
import { WorkExpModule } from '@modules/work-exp/work-exp.module';
import { ProjectsListModule } from '@modules/projects-list/projects-list.module';
import { ContactModule } from '@modules/contact/contact.module';

const routes: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AboutMeModule,
    WorkExpModule,
    ProjectsListModule,
    ContactModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeModule { }
