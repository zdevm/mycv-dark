import { Component, Input, OnInit } from '@angular/core'
import { Job } from '@interfaces/job'

@Component({
    selector: 'job-card',
    templateUrl: './job-card.component.html',
    styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent implements OnInit {
    @Input() job!: Job

    constructor() {}

    ngOnInit(): void {
        if (!this.job) {
            throw new Error('Job input property is missing!')
        }
    }
}
