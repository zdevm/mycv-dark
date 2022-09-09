import { Injectable } from '@angular/core';
import { Page } from '@interfaces/page';
import { HttpService } from '@services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class PageService extends HttpService {

  constructor() {
    super('pages');
  }

  get(pageId: string) {
    return this.http.get<Page>(`${this.url}/${pageId}`)
  }
}
