import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';




@Injectable({
    providedIn:'root'
})
export class AuthGaurd implements CanActivate, CanActivateChild {
    constructor(
        private appService: AppService,
        private router: Router
    ) { }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canLoggedInUserNavigate();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canLoggedInUserNavigate();
    }

    canLoggedInUserNavigate(){
        var userDetail = this.appService.getLoginUserDetail();
        if (userDetail && userDetail.MudID) {
            return true;
        } else {
            this.router.navigate(["/"]);
            return false;
        }
    }


}
