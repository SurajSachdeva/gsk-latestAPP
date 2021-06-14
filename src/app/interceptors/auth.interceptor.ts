import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(

  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return new Observable<HttpEvent<any>>(observer => {
      const authReq = req.clone({
        
      });
      const subscription = next.handle(authReq)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              observer.next(event);
            }
          },
          err => {
            observer.error(err)
          },
          () => {
            observer.complete();
          }
        );
      return () => {
        subscription.unsubscribe();
      }
    });
  }
}
