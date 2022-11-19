import { InjectionToken, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderModule } from '@modules/header/header.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonHttpInterceptor } from './interceptors/http-interceptor';
import { environment } from 'src/environments/environment';
import { Env } from '@interfaces/env';
import { LoadingScreenModule } from '@modules/loading-screen/loading-screen.module';
import { FooterModule } from '@modules/footer/footer.module';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { ProfileServiceToken } from '@services/profile/profile.service';
import { IntegratedProfileService } from '@services/profile/integrated/integrated-profile.service';
import { RemoteProfileService } from '@services/profile/remote/remote-profile.service';
import { PageServiceToken } from '@services/page/page.service';
import { IntegratedPageService } from '@services/page/integrated/integrated-page.service';
import { RemotePageService } from '@services/page/remote/remote-page.service';
import { ProjectServiceToken } from '@services/project/project.service';
import { SiteServiceToken } from '@services/site/site.service';
import { IntegratedProjectService } from '@services/project/integrated/integrated-project.service';
import { RemoteProjectService } from '@services/project/remote/remote-project.service';
import { IntegratedSiteService } from '@services/site/integrated/integrated-site.service';
import { RemoteSiteService } from '@services/site/remote/remote-site.service';
import { JobServiceToken } from '@services/job/job.service';
import { IntegratedJobService } from '@services/job/integrated/integrated-job.service';
import { RemoteJobService } from '@services/job/remote/remote-job.service';
import { ToastsContainerModule } from './modules/toasts-container/toasts-container.module';

export const EnvInjectionToken = new InjectionToken<Env>(
    'ENVIRONMENT Injection token',
    {
        providedIn: 'root',
        factory: () => environment,
    }
);

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () =>
            import('@pages/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'project',
        loadChildren: () =>
            import('@pages/project/project.module').then(
                (m) => m.ProjectModule
            ),
    },
    {
        path: 'page',
        loadChildren: () =>
            import('@pages/page/page.module').then((m) => m.PageModule),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
];

const abstractServices: Provider[] = [
    {
        provide: PageServiceToken,
        useFactory: (env: Env) => {
            return env.integratedServices
                ? new IntegratedPageService()
                : new RemotePageService();
        },
        deps: [EnvInjectionToken],
    },
    {
        provide: ProfileServiceToken,
        useFactory: (env: Env) => {
            return env.integratedServices
                ? new IntegratedProfileService()
                : new RemoteProfileService();
        },
        deps: [EnvInjectionToken],
    },
    {
        provide: ProjectServiceToken,
        useFactory: (env: Env) => {
            return env.integratedServices
                ? new IntegratedProjectService()
                : new RemoteProjectService();
        },
        deps: [EnvInjectionToken],
    },
    {
        provide: SiteServiceToken,
        useFactory: (env: Env) => {
            return env.integratedServices
                ? new IntegratedSiteService()
                : new RemoteSiteService();
        },
        deps: [EnvInjectionToken],
    },
    {
        provide: JobServiceToken,
        useFactory: (env: Env) => {
            return env.integratedServices
                ? new IntegratedJobService()
                : new RemoteJobService();
        },
        deps: [EnvInjectionToken],
    },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HeaderModule,
        RouterModule.forRoot(routes),
        NgbModule,
        HttpClientModule,
        LoadingScreenModule,
        FooterModule,
        ToastsContainerModule,
        NgcCookieConsentModule.forRoot({
            autoOpen: false,
            cookie: {
                domain: environment.domain,
            },
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CommonHttpInterceptor,
            multi: true,
        },
        ...abstractServices,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
