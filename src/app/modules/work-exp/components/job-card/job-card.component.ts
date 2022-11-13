import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core'
import { Job } from '@interfaces/job'
import { Duration } from '@interfaces/duration'

@Component({
    selector: 'job-card',
    templateUrl: './job-card.component.html',
    styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent implements OnInit, OnChanges {
    @Input() job!: Job

    currentlyWorking: boolean = false
    duration!: Duration

    constructor() {}

    ngOnInit(): void {
        if (!this.job) {
            throw new Error('Job input property is missing!')
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const job = changes['job']?.currentValue as Job
        if (job) {
            if (job.duration.to) {
                this.currentlyWorking = false
                this.duration = job.duration as Duration
            } else {
                this.currentlyWorking = true
                this.duration = {
                    ...job.duration,
                    to: new Date().toISOString(),
                }
            }
        }
    }
}
