import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProjectComponent } from './project.component'
import { SwiperModule } from 'swiper/angular'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{ path: ':id', component: ProjectComponent }]

@NgModule({
    declarations: [ProjectComponent],
    imports: [CommonModule, SwiperModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProjectModule {}
