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