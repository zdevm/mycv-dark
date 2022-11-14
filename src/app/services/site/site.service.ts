import { InjectionToken } from '@angular/core';
import { Site } from '@interfaces/site';
import { PageService } from '@services/page/page.service';
import { Observable } from 'rxjs';

export const SiteServiceToken = new InjectionToken<PageService>('Page Service');
export interface SiteService {
    get(): Observable<Site>;
}
