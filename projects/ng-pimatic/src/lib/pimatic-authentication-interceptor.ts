import { PIMATIC_CONFIG, Config } from './config';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';

export class PimaticAuthenticationInterceptor implements HttpInterceptor {

  constructor(@Inject(PIMATIC_CONFIG) private config: Config) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Basic ${btoa(this.config.user + ':' + this.config.password)}`)
    });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
