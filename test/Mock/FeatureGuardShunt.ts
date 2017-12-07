import {EventEmitter} from "@angular/core";
import {FeatureGuard} from "../../src/app/Service/FeatureGuard";

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

    canActivateMock(url: string) {
        return super.canActivate(<any>{}, <any>{url: url});
    }
}
