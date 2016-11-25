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

class AbstractStatisticModel {
    id: string;
    chartConfig;
    translate;
    constructor(translate, id) {
        this.translate = translate;
        this.id = id;
    }

    getId(): string {
        return this.id;
    }

    pushData(name: String, data: Array<number>, color: String) {
        this.chartConfig.series.push({
            name: this.translate.instant(name),
            data: data,
            color: color
        });
    }

    clearData() {
        this.chartConfig.series = [];
    }
}