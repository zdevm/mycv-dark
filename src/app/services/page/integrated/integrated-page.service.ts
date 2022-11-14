import { Injectable } from '@angular/core';
import { ErrorResponse } from '@classes/error-response';
import { Page } from '@interfaces/page';
import { PageService } from '@services/page/page.service';
import { Observable, of, throwError } from 'rxjs';
import { pages } from '@integrated/db';

@Injectable({
    providedIn: 'root',
})
export class IntegratedPageService implements PageService {
    constructor() {}

    get(pageId: string): Observable<Page> {
        const page = pages.find((page) => page.id === pageId);
        return page
            ? of(page)
            : throwError(() => new ErrorResponse(['Failed to find page']));
    }
}
