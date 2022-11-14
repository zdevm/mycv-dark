import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorResponse } from '@classes/error-response';
import { Project } from '@interfaces/project';
import { HttpService } from '@services/http/http.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RemoteProjectService extends HttpService {
    constructor() {
        super('projects');
    }

    retrieve(): Observable<Project[]> {
        return this.http.get<Project[]>(this.url).pipe(
            catchError((errResponse) => {
                if (errResponse instanceof HttpErrorResponse) {
                    return throwError(
                        () => new ErrorResponse(['Failed to retrieve pages'])
                    );
                }
                return throwError(() => new ErrorResponse(['Undefined error']));
            })
        );
    }

    getById(id: string): Observable<Project> {
        return this.http.get<Project>(`${this.url}/${id}`).pipe(
            catchError((errResponse) => {
                if (errResponse instanceof HttpErrorResponse) {
                    return throwError(
                        () =>
                            new ErrorResponse([
                                'Failed to retrieve specified project',
                            ])
                    );
                }
                return throwError(() => new ErrorResponse(['Undefined error']));
            })
        );
    }
}
