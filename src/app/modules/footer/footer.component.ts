import { Component, Inject, OnInit } from '@angular/core';
import { Site } from '@interfaces/site';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import { SiteService, SiteServiceToken } from '@services/site/site.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    site?: Site;
    show = true;

    constructor(
        private readonly loadingScreenService: LoadingScreenService,
        @Inject(SiteServiceToken) private readonly siteService: SiteService
    ) {}

    ngOnInit(): void {
        this.loadSiteInfo();
    }

    private loadSiteInfo() {
        this.loadingScreenService.show();
        this.siteService
            .get()
            .pipe(finalize(() => this.loadingScreenService.hide()))
            .subscribe((site) => {
                this.site = site;
            });
    }
}
