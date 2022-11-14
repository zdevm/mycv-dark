import { Injectable } from '@angular/core';
import { jobs } from '@integrated/db';
import { Job } from '@interfaces/job';
import { JobService } from '@services/job/job.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class IntegratedJobService implements JobService {
    constructor() {}

    retrieve(): Observable<Job[]> {
        return of(jobs);
    }
}
