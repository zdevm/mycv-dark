import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '@interfaces/page';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import { PageService } from '@services/page/page.service';
import { finalize, Subject } from 'rxjs';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnDestroy {
  page?: Page;
  private unsub$ = new Subject<void>();

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly loadingScreenService: LoadingScreenService,
              private readonly pageService: PageService) {
    this.listenPageIdParams();
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  private loadPage(id: string) {
    this.loadingScreenService.show();
    this.pageService.get(id)
    .pipe(finalize(() => this.loadingScreenService.hide()))
    .subscribe(page => {
      this.page = page;
    })
  }

  private listenPageIdParams() {
    this.activatedRoute.params
    .pipe(finalize(() => this.unsub$.next()))
    .subscribe(params => {
      if (params['id']) {
        this.loadPage(params['id']);
      }
    })
  }

}
