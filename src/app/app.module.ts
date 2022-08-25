import { InjectionToken, NgModule } from '@angular/core';
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

export const EnvInjectionToken = new InjectionToken<Env>('ENVIRONMENT Injection token', {
  providedIn: 'root',
  factory: () => environment
});

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'project',
    loadChildren: () => import('@pages/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }

]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    RouterModule.forRoot(routes),
    NgbModule,
    HttpClientModule,
    LoadingScreenModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
