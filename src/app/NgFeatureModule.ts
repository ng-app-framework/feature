import {ModuleWithProviders, NgModule} from '@angular/core';
import {FeatureConfig, Features} from "./Service/Features";
import {RouterModule} from "@angular/router";
import {FeatureGuard} from "./Service/FeatureGuard";
import {NgCoreModule} from "@ng-app-framework/core";


@NgModule({
    imports  : [
        NgCoreModule,
        RouterModule,
    ],
    exports  : [],
    providers: [
        Features,
        FeatureGuard,
        FeatureConfig
    ]
})
export class NgFeatureModule {

    public static forRoot(config: FeatureConfig): ModuleWithProviders {
        return {
            ngModule : NgFeatureModule,
            providers: [{
                provide : FeatureConfig,
                useValue: config
            }]
        };
    }
}

