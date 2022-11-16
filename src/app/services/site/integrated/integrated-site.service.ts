import { Injectable } from '@angular/core';
import { site } from '@integrated/db';
import { Site } from '@interfaces/site';
import { SiteService } from '@services/site/site.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class IntegratedSiteService implements SiteService {
    constructor() {}

    get(): Observable<Site> {
        return of(site);
    }
}
