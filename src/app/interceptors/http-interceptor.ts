import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from '@services/env/env.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommonHttpInterceptor implements HttpInterceptor {
    public constructor(private readonly envService: EnvService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let request = this.enrichUrl(req);
        return next.handle(request);
    }

    private enrichUrl(req: HttpRequest<any>): HttpRequest<any> {
        const apiUrl = this.envService.getOrThrow('api.url');
        return req.clone({
            url: `${apiUrl}/${req.url}`,
        });
    }
}
