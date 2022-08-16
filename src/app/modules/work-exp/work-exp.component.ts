import { Component, OnInit } from '@angular/core';
import { Job } from '@interfaces/job';
import { JobService } from '@services/job/job.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'work-exp',
  templateUrl: './work-exp.component.html',
  styleUrls: ['./work-exp.component.scss']
})
export class WorkExpComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.fetchPreviousJobs().subscribe(jobs => {
      this.jobs = jobs;
    })
  }

  fetchPreviousJobs(): Observable<Job[]> {
    return this.jobService.retrieve();
  }

}
