import {EventEmitter} from "@angular/core";
import {FeatureGuard} from "../../src/app/Service/FeatureGuard";
import {Observable} from "rxjs/Rx";

export class FeatureGuardShunt extends FeatureGuard {

    constructor() {
        super(
            <any>{
                navigateByUrl: (url: string) => {

                }
            },
            <any>{
                hasBeenSet    : false,
                onSet         : new EventEmitter<any>(),
                isRouteEnabled: (path: string) => {

                }
            }
        );
    }

    canActivateMock(url: string): Observable<boolean> | boolean {
        return super.canActivate(<any>{}, <any>{url: url});
    }
}
