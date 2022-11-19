import { Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorResponse } from '@classes/error-response';
import { Page } from '@interfaces/page';
import { ToastType } from '@interfaces/toast';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import { PageService, PageServiceToken } from '@services/page/page.service';
import { ToastService } from '@services/toast/toast.service';
import { finalize, Subject } from 'rxjs';

@Component({
    selector: 'page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnDestroy {
    page?: Page;
    private unsub$ = new Subject<void>();

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly loadingScreenService: LoadingScreenService,
        @Inject(PageServiceToken) private readonly pageService: PageService,
        private toastService: ToastService
    ) {
        this.listenPageIdParams();
    }

    ngOnDestroy(): void {
        this.unsub$.next();
        this.unsub$.complete();
    }

    private loadPage(id: string) {
        this.loadingScreenService.show();
        this.pageService
            .get(id)
            .pipe(finalize(() => this.loadingScreenService.hide()))
            .subscribe({
                next: (page) => {
                    this.page = page;
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

    private listenPageIdParams() {
        this.activatedRoute.params
            .pipe(finalize(() => this.unsub$.next()))
            .subscribe({
                next: (params) => {
                    if (params['id']) {
                        this.loadPage(params['id']);
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
}
