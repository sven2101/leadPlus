/**
 * Created by Max on 18.06.2016.
 */
/// <reference path="../../typeDefinitions/angular.d.ts" />
var TestController = (function () {
    function TestController() {
        this.name = "Susi";
    }
    TestController.prototype.changeName = function () {
        this.name = this.name === "Horst" ? "Hans" : "Horst";
    };
    return TestController;
}());
angular.module("testModule", []);
angular.module("testModule").controller("TestController", [TestController]);
