import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorResponse } from '@classes/error-response';
import { Page } from '@interfaces/page';
import { HttpService } from '@services/http/http.service';
import { PageService } from '@services/page/page.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RemotePageService extends HttpService implements PageService {
    constructor() {
        super('pages');
    }

    get(pageId: string) {
        return this.http.get<Page>(`${this.url}/${pageId}`).pipe(
            catchError((errResponse) => {
                if (errResponse instanceof HttpErrorResponse) {
                    return throwError(
                        () =>
                            new ErrorResponse([
                                'Failed to retrieve specified page',
                            ])
                    );
                }
                return throwError(() => new ErrorResponse(['Undefined error']));
            })
        );
    }
}
