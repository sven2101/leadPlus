/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Statistic/controller/Statistic.Service.ts" />
/// <reference path="../../Setting/controller/Setting.Source.Service.ts" />
/// <reference path="../../Workflow/Model/WorkflowType.ts"/>
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../App/App.Resource.ts" />
/// <reference path="../../App/App.Constants.ts" />
/// <reference path="../../Statistic/model/ColumnChart.Model.ts" />" />

const ProductStatisticDetailControllerId: string = "ProductStatisticDetailController";

class ProductStatisticDetailController {

    $inject = [ProductServiceId, $routeParamsId, ProductResourceId, StatisticServiceId, SourceServiceId, $scopeId, $translateId];

    productService: ProductService;
    statisticService: StatisticService;
    sourceService: SourceService;
    productResource;
    routeParams;
    currentProduct: Product;
    currentProductId: number;
    productFound: boolean = false;
    productStatisticColumnChart: PieChart;
    translate;
    dateRange: string;
    source: string;


    constructor(ProductService, $routeParams, ProductResource, StatisticService, SourceService, $scope, $translate) {
        this.productService = ProductService;
        this.statisticService = StatisticService;
        this.sourceService = SourceService;
        this.productResource = ProductResource.resource;
        this.dateRange = "ALL";
        this.source = "ALL";
        this.routeParams = $routeParams;
        this.currentProductId = this.routeParams.productId;
        this.translate = $translate;
        this.getProductById();
    }

    getProductById() {
        let self = this;
        this.productResource.getProductByIdIncludeDeleted({ id: this.currentProductId }).$promise.then(function (result: Product) {
            self.currentProduct = result;
            if (!isNullOrUndefined(self.currentProduct.id)) {
                self.productStatisticColumnChart = new PieChart(self.translate, "SPCLOS", self.currentProduct.name,
                    self.translate.instant("DETAIL_STATISTIC_TOOLTIP", { productname: "{series.name}", count: "{point.y}", workflow: "{point.name}" }) + "<br>" + self.translate.instant("STATISTIC_PARTS") + ": <b>{point.percentage:.1f}%</b>");
                self.productFound = true;
            }
        });
    }
}
angular.module(moduleStatisticProductDetail, [ngResourceId]).controller(ProductStatisticDetailControllerId, ProductStatisticDetailController);

