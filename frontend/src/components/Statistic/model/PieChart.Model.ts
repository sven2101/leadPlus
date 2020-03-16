/// <reference path="../../Statistic/model/AbstractStatisticModel.Model.ts" />" />
"use strict";

class PieChart extends AbstractStatisticModel {
    constructor(translate, id: string, seriesName: string, tooltip: string) {
        super(translate, id);
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
                tooltip: {
                    pointFormat: tooltip
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: "pointer",
                        dataLabels: {
                            enabled: true,
                            format: "<b>{point.y} {point.name} </b>",
                            style: {
                                color: (window["Highcharts"].theme && window["Highcharts"].theme.contrastTextColor) || "black"
                            }
                        }
                    }
                }
            },
            series: [{
                name: this.translate.instant(seriesName),
                colorByPoint: true,
                data: []
            }],
            loading: false
        };
    }
    pushData(name: string, data: Array<number>, color: string, slice: boolean = false, selected: boolean = false) {
        this.chartConfig.series[0].data.push({
            name: this.translate.instant(name),
            y: data[0],
            color: color,
            sliced: slice,
            selected: selected
        });
    }

    clearData() {
        this.chartConfig.series[0].data = [];
    }
}