/**
 * Created by Max on 27.07.2016.
 */

/// <reference path="../../typeDefinitions/angular.d.ts" />


class TestService {

    name:String;
    constructor(){
        this.name='Susi';
    }

    changeName(){
        this.name = this.name === 'Horst'?'Torsten':'Horst';
    }
}

angular.module('app').factory('TestService', [ () => new TestService()]);