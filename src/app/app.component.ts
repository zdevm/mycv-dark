import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import { ProfileService } from '@services/profile/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly faviconId = 'mainFavicon';

  public constructor(private readonly router: Router,
                     private readonly loadingScreenService: LoadingScreenService,
                     private readonly profileService: ProfileService,
                     private readonly titleService: Title) {
    this.listenRouter();
    this.loadFullNameAndSetTitle();
    this.updateFavicon();
  }

  /**
   * Checks if back end server has available favicon. If so, updates default favicon.
   */
  private updateFavicon() {
    const http = inject(HttpClient);
    http.get('favicon.ico', {
      observe: 'response',
      responseType: 'blob'
    }).subscribe({
      next: response => { 
        if (response.status === 200 && response.body?.size) { // favicon exists
          const blobUrl = window.URL.createObjectURL(response.body)
          const faviconElem = document.getElementById(this.faviconId);
          if (faviconElem && blobUrl) {
            faviconElem.setAttribute('href', blobUrl);
          }
        }
      }
    })
  }

  private loadFullNameAndSetTitle() {
    this.profileService.get().subscribe(profile => {
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
    })
  }

  private listenRouter() {
    this.router.events.subscribe(e => {
      if (e instanceof RouteConfigLoadStart) {
        this.loadingScreenService.show();
      } else if (e instanceof RouteConfigLoadEnd) {
        this.loadingScreenService.hide();
      }
    })
  }

}
