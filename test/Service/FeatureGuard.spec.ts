import {FeatureGuardShunt} from "../Mock/FeatureGuardShunt";
import {FeatureGuard} from "../../src/app/Service/FeatureGuard";

describe('Module: Feature', () => {
    describe('Class: FeatureGuard', () => {

        let service: FeatureGuardShunt;
        beforeEach(() => {
            service = new FeatureGuardShunt();
        });
        describe('On New Instance', () => {
            it('should be a new instance of FeatureGuard', () => {
                expect(service instanceof FeatureGuard).toBeTruthy();
            });
        });
        describe('After Instantiation', () => {
            describe('Method: Can Activate', () => {
                it('should return the result of authorize', () => {
                    let result        = false;
                    service.authorize = () => {
                        return result;
                    };

                    expect(service.canActivateMock('/route')).toBeFalsy();
                    result = true;
                    expect(service.canActivateMock('/route')).toBeTruthy();
                });
            });
            describe('Method: Authorize', () => {
                beforeEach(() => {
                    service.redirectIfCannotAccessRoute = () => true;
                });
                it('should check now if features are set', () => {
                    service.features.hasBeenSet      = true;
                    let called                       = false;
                    service.checkAfterFeaturesAreSet = (): any => {
                        called = true;
                        return true;
                    };
                    service.authorize('/route');
                    expect(called).toBeFalsy();
                });
                it('should check later if features are not set', () => {
                    service.features.hasBeenSet      = false;
                    let called                       = false;
                    service.checkAfterFeaturesAreSet = (): any => {
                        called = true;
                        return true;
                    };
                    service.authorize('/route');
                    expect(called).toBeTruthy();
                });
            });

            describe('Method: Redirect If Cannot Access Route', () => {
                it('should return true if can access route', () => {
                    let called                   = false;
                    service.canAccessRoute       = () => true;
                    service.router.navigateByUrl = (url: string): any => {
                        called = true;
                    };
                    expect(service.redirectIfCannotAccessRoute('/route')).toBeTruthy('authorized');
                    expect(called).toBeFalsy('redirected');

                });
                it('should redirect and return false if cannot access route', () => {
                    let called                   = false;
                    service.canAccessRoute       = () => false;
                    service.router.navigateByUrl = (url: string): any => {
                        called = true;
                    };
                    expect(service.redirectIfCannotAccessRoute('/route')).toBeFalsy('authorized');
                    expect(called).toBeTruthy('redirected');

                });
            });

            describe('Method: Can Access Route', () => {
                describe('Should Return True', () => {
                    it('is a feature enabled route', () => {
                        service.features.isRouteEnabled = () => true;
                        expect(service.canAccessRoute('/test')).toBeTruthy();
                    });
                });
                describe('Should Return False', () => {
                    it('is not a feature enabled route', () => {
                        service.features.isRouteEnabled = () => false;
                        expect(service.canAccessRoute('/test')).toBeFalsy();
                    });
                })
            });

            describe('Method: Check After Features Are Set', () => {
                it('should listen on an event and then fire the check', (done) => {
                    service.redirectIfCannotAccessRoute = () => true;
                    service.checkAfterFeaturesAreSet('/test').subscribe((value) => {
                        expect(value).toBeTruthy();
                        done();
                    });
                    service.features.onSet.emit([]);
                });
            });
        });
    });
});
