import { Injectable } from '@angular/core';
import { Site } from '@interfaces/site';
import { HttpService } from '@services/http/http.service';
import { ReplaySubject, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SiteService extends HttpService {
    private cachedSite$?: ReplaySubject<Site>;

    constructor() {
        super('site');
    }

    get() {
        if (this.cachedSite$) {
            return this.cachedSite$.asObservable();
        }
        this.cachedSite$ = new ReplaySubject<Site>();
        return this.http.get<Site>(this.url).pipe(
            tap((site) => {
                this.cachedSite$!.next(site);
                this.cachedSite$!.complete();
            })
        );
    }
}
