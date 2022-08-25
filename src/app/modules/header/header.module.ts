import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NgbOffcanvasModule,
    RouterModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
