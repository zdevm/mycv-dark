import { Component, OnInit } from '@angular/core';
import { Job } from '@interfaces/job';
import { JobService } from '@services/job/job.service';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'work-exp',
  templateUrl: './work-exp.component.html',
  styleUrls: ['./work-exp.component.scss']
})
export class WorkExpComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService,
              private loadingScreenService: LoadingScreenService) { }

  ngOnInit(): void {
    this.fetchPreviousJobs().subscribe(jobs => {
      this.jobs = jobs;
    })
  }

  fetchPreviousJobs(): Observable<Job[]> {
    this.setLoading(true);
    return this.jobService.retrieve()
                          .pipe(finalize(() => this.setLoading(false)));
  }

  private setLoading(status: boolean) {
    this.loadingScreenService.show(status);
  }

}
