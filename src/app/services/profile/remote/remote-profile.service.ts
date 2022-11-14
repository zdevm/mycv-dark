import { Injectable } from '@angular/core';
import { HttpService } from '@services/http/http.service';
import { ProfileService } from '@services/profile/profile.service';
import { catchError, ReplaySubject, tap, throwError } from 'rxjs';
import { Profile } from '@interfaces/profile';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '@classes/error-response';

@Injectable({
    providedIn: null,
})
export class RemoteProfileService
    extends HttpService
    implements ProfileService
{
    private cachedProfile$?: ReplaySubject<Profile>;

    constructor() {
        super('profile');
    }

    get() {
        if (this.cachedProfile$) {
            return this.cachedProfile$.asObservable();
        }
        this.cachedProfile$ = new ReplaySubject<Profile>();
        return this.http.get<Profile>(this.url).pipe(
            tap((profile) => {
                this.cachedProfile$!.next(profile);
                this.cachedProfile$!.complete();
            }),
            catchError((errResponse) => {
                if (errResponse instanceof HttpErrorResponse) {
                    return throwError(
                        () => new ErrorResponse(['Failed to retrieve profile'])
                    );
                }
                return throwError(() => new ErrorResponse(['Undefined error']));
            })
        );
    }
}
