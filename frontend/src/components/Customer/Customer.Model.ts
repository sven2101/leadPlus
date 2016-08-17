/// <reference path="../Common/AbstractModel.Model.ts" />
/// <reference path="../app/App.Common.ts" />
/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH. All rights reserved.
 * 
 * NOTICE: All information contained herein is, and remains the property of
 * Eviarc GmbH and its suppliers, if any. The intellectual and technical
 * concepts contained herein are proprietary to Eviarc GmbH, and are protected
 * by trade secret or copyright law. Dissemination of this information or
 * reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from Eviarc GmbH.
 ******************************************************************************/
"use strict";

class Customer extends AbstractModel {

    title: string;
    firstname: string;
    lastname: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    timestamp: any;
    deactivated: boolean;
    constructor() {
        super();
    }
}