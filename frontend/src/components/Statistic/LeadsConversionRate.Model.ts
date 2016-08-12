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

class LeadsConversionRate {
    chartConfig;
    translate;
    constructor(translate) {
        this.translate = translate;
        this.chartConfig = {
            options: {
                chart: {
                    type: "spline"
                },
                title: {
                    text: ""
                },
                loading: false,
                xAxis: {
                    categories: [],
                },
                yAxis: {
                    title: {
                        text: this.translate.instant("STATISTIC_SALES_OF_LEADS_Y_AXIS")
                    },
                    minorGridLineWidth: 1,
                    gridLineWidth: 1,
                    alternateGridColor: null

                },
                tooltip: {
                    valueSuffix: " %",
                    valueDecimals: 2
                },
                plotOptions: {
                    spline: {
                        lineWidth: 4,
                        states: {
                            hover: {
                                lineWidth: 5
                            }
                        },
                        marker: {
                            enabled: false
                        }
                    }
                },
            },
            series: []
        };
    }
}