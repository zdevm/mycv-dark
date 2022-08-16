import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import trim from 'lodash-es/trim';

export abstract class HttpService {
  private _http: HttpClient;
  private _url: string;

  constructor(pathUrl: string) {
    this._url = pathUrl;
    for (const trimChar of [' ', '/']) {
      this._url = trim(pathUrl, trimChar);
    }

    this._http = inject(HttpClient);
  }

  protected get http() {
    return this._http;
  }

  get url() {
    return this._url;
  }


}
