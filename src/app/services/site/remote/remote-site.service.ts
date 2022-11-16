import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorResponse } from '@classes/error-response';
import { Site } from '@interfaces/site';
import { HttpService } from '@services/http/http.service';
import { SiteService } from '@services/site/site.service';
import { catchError, Observable, ReplaySubject, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RemoteSiteService extends HttpService implements SiteService {
    private cachedSite$?: ReplaySubject<Site>;

    constructor() {
        super('site');
    }

    get(): Observable<Site> {
        if (this.cachedSite$) {
            return this.cachedSite$.asObservable();
        }
        this.cachedSite$ = new ReplaySubject<Site>();
        return this.http.get<Site>(this.url).pipe(
            tap((site) => {
                this.cachedSite$!.next(site);
                this.cachedSite$!.complete();
            }),
            catchError((errResponse) => {
                if (errResponse instanceof HttpErrorResponse) {
                    return throwError(
                        () =>
                            new ErrorResponse([
                                'Failed to retrieve site settings',
                            ])
                    );
                }
                return throwError(() => new ErrorResponse(['Undefined error']));
            })
        );
    }
}
