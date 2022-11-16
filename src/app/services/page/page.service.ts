import { InjectionToken } from '@angular/core';
import { Page } from '@interfaces/page';
import { Observable } from 'rxjs';

export const PageServiceToken = new InjectionToken<PageService>('PageService');

export interface PageService {
    get(pageId: string): Observable<Page>;
}
