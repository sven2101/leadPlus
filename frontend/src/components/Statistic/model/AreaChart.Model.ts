/// <reference path="../../Statistic/model/AbstractStatisticModel.Model.ts" />" />
"use strict";

class AreaChart extends AbstractStatisticModel {
    constructor(translate, id: string, yname: string, valueSuffix: string) {
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
                    valueSuffix: valueSuffix,
                    valueDecimals: 2
                },
                xAxis: {
                    categories: [],
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
            series: []
        };
    }
}