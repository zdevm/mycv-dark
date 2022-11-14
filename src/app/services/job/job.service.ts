import { InjectionToken } from '@angular/core';
import { Job } from '@interfaces/job';
import { Observable } from 'rxjs';

export const JobServiceToken = new InjectionToken('JobService');
export interface JobService {
    retrieve(): Observable<Job[]>;
}
