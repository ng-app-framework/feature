import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Features} from "./Features";
import {UnsubscribeAll} from "@ng-app-framework/core";
import {Observable} from "rxjs/Rx";

@Injectable()
export class FeatureGuard implements CanActivate {


    constructor(public router: Router, public features: Features) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.authorize(state.url);
    }

    authorize(route: string): Observable<boolean> | boolean {
        if (!this.features.hasBeenSet) {
            return this.checkAfterFeaturesAreSet(route);
        }
        return this.redirectIfCannotAccessRoute(route);
    }

    checkAfterFeaturesAreSet(route: string): Observable<boolean> {
        return this.features.onSet.takeUntil(UnsubscribeAll).first().map(enabled => {
            return this.redirectIfCannotAccessRoute(route);
        });
    }

    redirectIfCannotAccessRoute(route): boolean {
        if (this.canAccessRoute(route)) {
            return true;
        }
        this.router.navigateByUrl('/unauthorized');
        return false;
    }

    canAccessRoute(path): boolean {
        return this.features.isRouteEnabled(path);
    }
}
