/// <reference path="../../Tenant/model/License.Model.ts" />

class Tenant {

    id: number;
    tenantKey: string;
    description: string;
    address: string;
    license: License;
    registration: Signup;
    constructor() {
        this.license = new License();
    }
}