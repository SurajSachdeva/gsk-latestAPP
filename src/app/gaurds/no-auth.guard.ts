import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';




@Injectable({
    providedIn:'root'
})
export class NoAuthGaurd implements CanActivate {
    constructor(
        private appService: AppService,
        private router: Router
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        var userDetail = this.appService.getLoginUserDetail();
        if (userDetail && userDetail.MudID) {
            this.router.navigate(["/LandingPage"]);
            return false;
        } else {
            return true;
        }
    }


}
