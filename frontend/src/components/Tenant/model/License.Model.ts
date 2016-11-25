/// <reference path="../../common/model/AbstractModel.Model.ts" />

"use strict";

class License extends AbstractModel {

    licenseType: string;
    term: any;
    trial: boolean;
    constructor() {
         super();
    }
}