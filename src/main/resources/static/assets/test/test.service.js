/**
 * Created by Max on 27.07.2016.
 */
/// <reference path="../../typeDefinitions/angular.d.ts" />
var TestService = (function () {
    function TestService() {
        this.name = "Susi";
    }
    TestService.prototype.changeName = function () {
        this.name = this.name === "Horst" ? "Torsten" : "Horst";
    };
    return TestService;
}());
angular.module("app").factory("TestService", [function () { return new TestService(); }]);
