/// <reference path="../../common/model/AbstractModel.Model.ts" />

"use strict";

class Tenant extends AbstractModel {

    tenantKey: string;
    description: string;
    address: string;
    constructor() {
         super();
    }
}