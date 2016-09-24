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

class ColumnChart extends AbstractStatisticModel {
    constructor(translate, id: string, yname: string, valueSuffix: string) {
        super(translate, id);
        this.chartConfig = {
            options: {
                chart: {
                    type: "column"
                },
                title: {
                    text: ""
                },
                tooltip: {
                    shared: true,
                    valueSuffix: valueSuffix,
                    valueDecimals: 2
                },
                xAxis: {
                    type: "category"
                },
                loading: false,
                yAxis: {
                    title: {
                        text: this.translate.instant(yname),
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                }
            },
            series: [{
                name: this.translate.instant(yname),
                colorByPoint: true,
                data: []
            }],
        };
    }
    pushData(name: string, data: Array<number>, color: string) {
        this.chartConfig.series[0].data.push({
            name: this.translate.instant(name),
            y: data[0],
            color: color
        });
    }
}