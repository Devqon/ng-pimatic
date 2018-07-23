import { PimaticService } from './pimatic.service';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PimaticAuthenticationInterceptor implements HttpInterceptor {

  constructor(private pimatic: PimaticService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Basic ${btoa(this.pimatic.config.user + ':' + this.pimatic.config.password)}`)
    });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
