import {EventEmitter, Injectable, Optional} from "@angular/core";
import {Value} from "@ng-app-framework/core";

export class FeatureConfig {
    [key: string]: any;
}

@Injectable()
export class Features {

    private enabled: Array<string> = [];

    hasBeenSet = false;

    onSet = new EventEmitter<any>();

    constructor(@Optional() private config: FeatureConfig = {}) {
        this.setConfig(config);
    }

    public isRouteEnabled(route: string) {
        for (let feature of this.getRequiredFeaturesForRoute(route)) {
            if (this.enabled.indexOf(feature) === -1) {
                return false;
            }
        }
        return true;
    }

    protected setRouteFeatureList(route: string, features: string[]) {
        this.config[route] = features;
    }

    public setEnabled(enabled: [{ constant: string }]) {
        this.enabled = [];
        for (let feature of enabled) {
            this.enabled.push(feature.constant);
        }
        this.hasBeenSet = true;
        this.onSet.emit(this.enabled);
    }

    public getRequiredFeaturesForRoute(route: string) {
        return this.config[route] || [];
    }

    public getEnabled() {
        return this.enabled.join(',').split(',');
    }

    public setConfig(config: FeatureConfig) {
        for (let key in config) {
            this.setRouteFeatureList(key, config[key]);
        }
        this.config = config;
    }

    public getConfig() {
        return this.config;
    }
}
