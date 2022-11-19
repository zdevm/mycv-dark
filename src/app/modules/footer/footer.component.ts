import { Component, Inject, OnInit } from '@angular/core';
import { ErrorResponse } from '@classes/error-response';
import { Site } from '@interfaces/site';
import { ToastType } from '@interfaces/toast';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import { SiteService, SiteServiceToken } from '@services/site/site.service';
import { ToastService } from '@services/toast/toast.service';
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
        @Inject(SiteServiceToken) private readonly siteService: SiteService,
        private readonly toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.loadSiteInfo();
    }

    private loadSiteInfo() {
        this.loadingScreenService.show();
        this.siteService
            .get()
            .pipe(finalize(() => this.loadingScreenService.hide()))
            .subscribe({
                next: (site) => {
                    this.site = site;
                },
                error: (err: ErrorResponse) => {
                    this.toastService.show({
                        type: ToastType.Text,
                        body: err.message,
                        customClass: 'bg-danger',
                        autoHide: true,
                        dismissible: false,
                    });
                },
            });
    }
}
