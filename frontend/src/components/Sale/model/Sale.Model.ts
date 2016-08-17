/// <reference path="../../Common/AbstractModel.Model.ts" />
/// <reference path="../../Common/OrderPosition.Model.ts" />

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

class Sale extends AbstractModel {
    orderPositions: Array<OrderPosition>;
    container: any;
    containerAmount: number;
    customer: any;
    timestamp: any;
    vendor: any;
    deliveryAddress: any;
    deliveryDate: any;
    transport: any;
    saleProfit: number;
    saleReturn: number;
    constructor() {
        super();
    }
}