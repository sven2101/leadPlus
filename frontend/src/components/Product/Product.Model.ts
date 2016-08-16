/// <reference path="../Common/AbstractModel.Model.ts" />" />
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

class Product extends AbstractModel {

    name: String;
    description: String;
    priceNetto: number;
    image: any;
    timestamp: any;
    isDeactivated;

    constructor() {
        super();
        this.name = "";
        this.description = "";
        this.isDeactivated = false;
    }

}
