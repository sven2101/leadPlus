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

class SplineChart extends AbstractStatisticModel {
    constructor(translate, id, yName: string, valueSuffix: string) {
        super(translate, id);
        this.translate = translate;
        this.chartConfig = {
            options: {
                chart: {
                    type: "spline"
                },
                title: "",
                tooltip: {
                    shared: true,
                    valueSuffix: valueSuffix
                },
                loading: false,
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: this.translate.instant(yName)
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: "#808080"
                    }]
                }
            },
            series: [],
            // function (optional)
            func: function (chart) {
                // setup some logic for the chart
            }
        };
    }
}