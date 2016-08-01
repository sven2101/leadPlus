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

class SharedItemsPieChart {
    chartConfig;
    translate;
    constructor(translate) {
        this.translate = translate;
        this.chartConfig = {
            options: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: "pie"
                }
                ,
                title: {
                    text: ""
                },
                tooltip: {},
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: "pointer",
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: (window["Highcharts"].theme && window["Highcharts"].theme.contrastTextColor) || "black"
                            }
                        }
                    }
                }
            },
            series: [{
                name: this.translate.instant("STATISTIC_PARTS"),
                colorByPoint: true,
                data: []
            }],
            loading: false
        };
    }
}