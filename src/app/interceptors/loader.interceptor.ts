import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../modules/shared/services/shared.service';



/**
 * Loader interceptor
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(
        private sharedService: SharedService
    ) { }

    private requests: HttpRequest<any>[] = [];

    /**
     * Removes request
     * @param req 
     */
    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.sharedService.loaderSubject$.next(this.requests.length > 0);
    }


    /**
     * Intercepts loader interceptor
     * @param req 
     * @param next 
     * @returns intercept 
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        this.requests.push(req);
        this.sharedService.loaderSubject$.next(true);

        return new Observable<HttpEvent<any>>(observer => {
            const subscription = next.handle(req)
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
                this.removeRequest(req);
            }
        });
    }
}
