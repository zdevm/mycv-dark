import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  private loadingScreenOn = false;
  private loadingLayers = 0;
  loader$ = new BehaviorSubject<boolean>(this.loadingScreenOn); // can only be used by loading-screen component

  constructor() { }

  show(): void
  show(show: boolean): void 
  show(show = true): void {
    if (show) {
      this.loadingLayers++;
    } else if (--this.loadingLayers) {
      return;
    }
    this.loadingScreenOn = show;
    this.loader$.next(this.loadingScreenOn);
  }

  hide(): void {
    this.show(false);
  }

}
