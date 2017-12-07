import {ModuleWithProviders, NgModule} from '@angular/core';
import {FeatureConfig, Features} from "./Service/Features";
import {RouterModule} from "@angular/router";
import {FeatureGuard} from "./Service/FeatureGuard";
import {CoreModule} from "@ng-app-framework/core";


@NgModule({
    imports  : [
        CoreModule,
        RouterModule,
    ],
    exports  : [],
    providers: [
        Features,
        FeatureGuard,
        FeatureConfig
    ]
})
export class FeatureModule {

    public static forRoot(config: FeatureConfig): ModuleWithProviders {
        return {
            ngModule : FeatureModule,
            providers: [{
                provide : FeatureConfig,
                useValue: config
            }]
        };
    }
}

