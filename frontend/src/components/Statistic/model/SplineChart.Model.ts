/// <reference path="../../Statistic/model/AbstractStatisticModel.Model.ts" />" />
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