/**
 * Created by Max on 27.07.2016.
 */
/// <reference path="../../typeDefinitions/angular.d.ts" />
/// <reference path="../../typeDefinitions/jasmine.d.ts" />
/// <reference path="../../typeDefinitions/angular-mock.d.ts" />
describe("TestController tests", function () {
    var testController;
    beforeEach(function () {
        angular.module("app");
        angular.module("testModule");
    });
    it("should not return the same name", function () {
        expect("Horst").toBe("Horst");
    });
    it("should be wrong", function () {
        expect(1).toBe(0);
    });
});
