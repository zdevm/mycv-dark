import { Component } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'curriculum-vitae';


  public constructor(private readonly router: Router,
                     private readonly loadingScreenService: LoadingScreenService) {}

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
