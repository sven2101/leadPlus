/// <reference path="../../Api/model/ApiVendor.ts" />

"use strict";

class Api {
    id: number;
    authenticationKey: string;
    authenticationValue: string;
    tenant: string;
    version: string;
    isVerified: boolean;
    isDeactivated: boolean;
    apiVendor: ApiVendor;
    password: string;
    decrypted: boolean;

    constructor() {
    }
}