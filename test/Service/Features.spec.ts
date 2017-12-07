import {Features} from "../../src/app/Service/Features";

describe('Module: Feature', () => {
    describe('Class: Features', () => {
        let features: Features = null;
        beforeEach(() => {
            features = new Features();
        });
        it('should accept a key value pair for setConfig', () => {
            let config = {
                '/route/1': ['test-feature']
            };
            expect(features.getConfig()).toEqual({});
            features.setConfig(config);
            expect(features.getConfig()).toEqual(config);

        });
        let verifyInvalidConfig = function (config: any) {
            expect(() => {
                features.setConfig(config)
            }).toThrow();
        };
        describe('Method: Set Config', () => {
            it('should not fail if the structure was valid', () => {
                expect(() => {
                    features.setConfig({
                        '/route/1': ['test-feature'],
                        '/route/2': ['test-feature-2'],
                        '/route/3': ['test-feature', 'test-feature-3'],
                        '/route/4': ['test-feature', 'test-feature-2']

                    });
                }).not.toThrow();
            });
        });
        describe('Config has been set', () => {
            beforeEach(() => {
                features.setConfig({
                    '/route/1': ['test-feature'],
                    '/route/2': ['test-feature-2'],
                    '/route/3': ['test-feature', 'test-feature-3'],
                    '/route/4': ['test-feature', 'test-feature-2']

                });

                features.setEnabled(<any>[{constant: 'test-feature'}, {constant: 'test-feature-3'}]);
            });
            describe('Method: Is Route Enabled', () => {

                it('should return a boolean', () => {

                    expect(features.isRouteEnabled('/route/1')).toBeTruthy();
                    expect(features.isRouteEnabled('/route/2')).toBeFalsy();
                    expect(features.isRouteEnabled('/route/3')).toBeTruthy();
                    expect(features.isRouteEnabled('/route/4')).toBeFalsy();
                });
            });
            describe('Method: Get Enabled', () => {

                it('should return the enabled features when requested', () => {
                    expect(features.getEnabled()).toEqual(['test-feature', 'test-feature-3']);
                });
            });

            describe('Method: Get Required Features For Route', () => {
                it('should return an array regardless if a route is defined', () => {
                    expect(features.getRequiredFeaturesForRoute('/route/1')).toEqual(['test-feature']);
                    expect(features.getRequiredFeaturesForRoute('/does/not/exist')).toEqual([]);
                });
            });
        });
    });
});
