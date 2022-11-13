import { Injectable } from '@angular/core';
import { Job } from '@interfaces/job';
import { HttpService } from '@services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JobService extends HttpService {
    constructor() {
        super('jobs');
    }

    retrieve(): Observable<Job[]> {
        return this.http.get<Job[]>(this.url);
    }
}
