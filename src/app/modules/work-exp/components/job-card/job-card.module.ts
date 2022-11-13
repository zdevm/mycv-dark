import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { JobCardComponent } from './job-card.component'
import { HumanizeDurationModule } from 'src/app/pipes/humanize-duration/humanize-duration.module'

@NgModule({
    declarations: [JobCardComponent],
    imports: [CommonModule, HumanizeDurationModule],
    exports: [JobCardComponent],
})
export class JobCardModule {}
