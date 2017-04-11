/// <reference path="../../Api/model/ApiVendor.ts" />

/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
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