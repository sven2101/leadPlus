/// <reference path="../../common/model/AbstractModel.Model.ts" />
/// <reference path="../../Tenant/model/License.Model.ts" />

"use strict";

class Tenant extends AbstractModel {

    tenantKey: string;
    description: string;
    address: string;
    license: License;
    constructor() {
        super();
        this.license = new License();
    }
}