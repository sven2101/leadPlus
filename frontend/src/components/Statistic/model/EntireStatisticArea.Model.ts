/// <reference path="../../Statistic/model/AbstractStatisticModel.Model.ts" />" />
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

class EntireStatisticArea extends AbstractStatisticModel {
    constructor(translate, id) {
        super(translate, id);
        this.chartConfig = {
            options: {
                chart: {
                    type: "area"
                },
                title: {
                    text: ""
                },
                tooltip: {
                    shared: true,
                    valueSuffix: " €",
                    valueDecimals: 2
                },
                xAxis: {
                    categories: [],
                },
                loading: false,
                yAxis: {
                    title: {
                        text: this.translate.instant("STATISTIC_PROFIT_AND_RETURN_Y_AXIS"),
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                }
            },
            series: []
        };
    }
}