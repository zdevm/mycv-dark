import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorResponse } from '@classes/error-response';
import { Job } from '@interfaces/job';
import { HttpService } from '@services/http/http.service';
import { JobService } from '@services/job/job.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RemoteJobService extends HttpService implements JobService {
    constructor() {
        super('jobs');
    }

    retrieve(): Observable<Job[]> {
        return this.http.get<Job[]>(this.url).pipe(
            catchError((errResponse) => {
                if (errResponse instanceof HttpErrorResponse) {
                    return throwError(
                        () => new ErrorResponse(['Failed to retrieve jobs'])
                    );
                }
                return throwError(() => new ErrorResponse(['Undefined error']));
            })
        );
    }
}
