/**
 * Created by Max on 18.06.2016.
 */

/// <reference path="../../typeDefinitions/angular.d.ts" />


class TestController {
    name: String;
    constructor() {
        this.name = "Susi";
    }

    changeName() {
        this.name = this.name === "Horst" ? "Hans" : "Horst";
    }
}
angular.module("testModule", []);
angular.module("testModule").controller("TestController", [TestController]);


