import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { Profile } from '@interfaces/profile';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';
import { ProfileService } from '@services/profile/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public constructor(private readonly router: Router,
                     private readonly loadingScreenService: LoadingScreenService,
                     private readonly profileService: ProfileService,
                     private readonly titleService: Title) {
    this.listenRouter();
    this.loadFullNameAndSetTitle();
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
