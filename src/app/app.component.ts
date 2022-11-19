import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
    RouteConfigLoadEnd,
    RouteConfigLoadStart,
    Router,
} from '@angular/router';
import { ErrorResponse } from '@classes/error-response';
import { Site } from '@interfaces/site';
import { ToastType } from '@interfaces/toast';
import { EnvService } from '@services/env/env.service';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import {
    ProfileService,
    ProfileServiceToken,
} from '@services/profile/profile.service';
import { SiteService, SiteServiceToken } from '@services/site/site.service';
import { ToastService } from '@services/toast/toast.service';
import {
    NgcCookieConsentConfig,
    NgcCookieConsentService,
} from 'ngx-cookieconsent';
import { finalize } from 'rxjs';
import { EnvInjectionToken } from 'src/app/app.module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    site?: Site;
    private readonly faviconId = 'mainFavicon';

    public constructor(
        private readonly router: Router,
        private readonly loadingScreenService: LoadingScreenService,
        @Inject(ProfileServiceToken)
        private readonly profileService: ProfileService,
        private readonly titleService: Title,
        @Inject(SiteServiceToken) private readonly siteService: SiteService,
        private readonly ccService: NgcCookieConsentService,
        private envService: EnvService,
        private readonly toastService: ToastService
    ) {
        this.listenRouter();
        this.loadFullNameAndSetTitle();
        this.updateFavicon();
        this.loadSiteInfo();
    }

    /**
     * Checks if back end server has available favicon. If so, updates default favicon.
     */
    private updateFavicon() {
        if (!this.envService.get('integratedServices', false)) {
            const http = inject(HttpClient);
            http.get('favicon.ico', {
                observe: 'response',
                responseType: 'blob',
            }).subscribe({
                next: (response) => {
                    if (response.status === 200 && response.body?.size) {
                        // favicon exists
                        const blobUrl = window.URL.createObjectURL(
                            response.body
                        );
                        const faviconElem = document.getElementById(
                            this.faviconId
                        );
                        if (faviconElem && blobUrl) {
                            faviconElem.setAttribute('href', blobUrl);
                        }
                    }
                },
            });
        }
    }

    private loadFullNameAndSetTitle() {
        this.profileService.get().subscribe({
            next: (profile) => {
                let title = 'Curriculum vitae';
                if (profile) {
                    const fullName = `${profile.firstName} ${profile.lastName}`;
                    const tokens = [fullName];
                    if (profile.occupation) {
                        tokens.push(profile.occupation);
                    }
                    title = tokens.join(' - ');
                }
                this.titleService.setTitle(title);
            },
            error: (err: ErrorResponse) => {
                this.toastService.show({
                    type: ToastType.Text,
                    body: err.message,
                    customClass: 'bg-danger',
                    autoHide: true,
                });
            },
        });
    }

    private loadSiteInfo() {
        this.loadingScreenService.show();
        this.siteService
            .get()
            .pipe(finalize(() => this.loadingScreenService.hide()))
            .subscribe({
                next: (site) => {
                    this.site = site;
                    if (!this.site) {
                        return;
                    }
                    if (this.site.showCookieConsentPrompt) {
                        this.showCookieConsent(site);
                    }
                },
                error: (err: ErrorResponse) => {
                    this.toastService.show({
                        type: ToastType.Text,
                        body: err.message,
                        customClass: 'bg-danger',
                        autoHide: true,
                    });
                },
            });
    }

    private showCookieConsent(site: Site) {
        // get default settings (set in AppModule)
        let config: NgcCookieConsentConfig = this.ccService.getConfig() || {};
        // merge with backend settings
        if (site.cookieConsentSettings) {
            config = { ...config, ...site.cookieConsentSettings };
        }
        this.ccService.init(config);
        if (!this.ccService.hasAnswered()) {
            this.ccService.open();
        } else {
            this.ccService.toggleRevokeButton(true);
        }
    }

    private listenRouter() {
        this.router.events.subscribe((e) => {
            if (e instanceof RouteConfigLoadStart) {
                this.loadingScreenService.show();
            } else if (e instanceof RouteConfigLoadEnd) {
                this.loadingScreenService.hide();
            }
        });
    }
}
