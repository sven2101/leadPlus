/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../User/Model/User.Model.ts" />
/// <reference path="../../Process/model/Process.Model.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />

const SaleDataTableServiceId: string = "SaleDataTableService";
const allDataSaleRoute: string = "/api/rest/processes/sales";
const openDataSaleRoute: string = "/api/rest/processes/sales/latest/50";

class SaleDataTableService implements IDatatableService {

    $inject = [DTOptionsBuilderId, DTColumnBuilderId, $filterId, $compileId, $rootScopeId, $translateId, WorkflowServiceId, WorkflowDatatableServiceId, TokenServiceId, $httpId];

    workflowService: WorkflowService;
    workflowDatatableService: WorkflowDatatableService;
    translate;
    dtOptions;
    dtColumns;
    DTOptionsBuilder;
    DTColumnBuilder;
    filter;
    compile;
    rootScope;

    constructor(DTOptionsBuilder, DTColumnBuilder, $filter, $compile, $rootScope, $translate, WorkflowService, WorkflowDatatableService, private TokenService: TokenService, private $http) {
        this.translate = $translate;
        this.DTOptionsBuilder = DTOptionsBuilder;
        this.DTColumnBuilder = DTColumnBuilder;
        this.filter = $filter;
        this.compile = $compile;
        this.rootScope = $rootScope;
        this.workflowService = WorkflowService;
        this.workflowDatatableService = WorkflowDatatableService;
    }

    getDTOptionsConfiguration(createdRow: Function, defaultSearch: string = "") {
        let self = this;
        return this.DTOptionsBuilder.newOptions()
            .withOption("ajax", function (data, callback, settings) {
                if (!isNullOrUndefined(self.workflowDatatableService.cache[WorkflowType.SALE.toString()])) {
                    setTimeout(function () {
                        callback(self.workflowDatatableService.cache[WorkflowType.SALE.toString()]);
                    }, 400);
                }
                self.$http.get(openDataSaleRoute).then(function (response) {
                    if (isNullOrUndefined(self.workflowDatatableService.cache[WorkflowType.SALE.toString()])) {
                        callback(response.data);
                    }
                    self.workflowDatatableService.cache[WorkflowType.SALE.toString()] = response.data;
                    let refreshObject = {
                        data: response.data,
                        timestamp: newTimestamp(),
                        workflow: WorkflowType.SALE
                    };
                    setTimeout(function () {
                        self.rootScope.$broadcast(broadcastUpdateOldRow, refreshObject);
                    }, 400);

                });
            })
            .withOption("stateSave", false)
            .withDOM(this.workflowDatatableService.getDomString())
            .withPaginationType("full_numbers")
            .withButtons(this.workflowDatatableService.getButtons(this.translate("SALE_SALES"), [8, 3, 2, 4, 7, 6, 14, 13, 10, 11]))
            .withBootstrap()
            .withOption("createdRow", createdRow)
            .withOption("deferRender", true)
            .withOption("lengthMenu", [10, 20, 50])
            .withOption("order", [6, "desc"])
            .withOption("search", { "search": defaultSearch })
            .withLanguageSource(this.workflowDatatableService.getLanguageSource(this.rootScope.language));
    }

    getDetailHTML(id: number): string {
        return "<a id='id_" + id + "' class='green shortinfo' href='javascript:;'"
            + "ng-click='saleCtrl.appendChildRow(" + id + ")' title='Details'>"
            + "<i class='glyphicon glyphicon-plus-sign'/></a>";
    }

    getDTColumnConfiguration(addDetailButton: Function, addStatusStyle: Function, addActionsButtons: Function): Array<any> {
        let self = this;
        return [
            /*this.DTColumnBuilder.newColumn(null).withTitle("").notSortable()
                            .renderWith(addDetailButton),*/
            this.DTColumnBuilder.newColumn(null).withTitle(
                "<i style='margin-top:2px;margin-left:12px;' class='fa fa-thumb-tack' aria-hidden='true'></i>").withClass("text-center").renderWith(function (data: Process, type, full) {
                    if (data.processor != null && data.processor.thumbnail != null) {
                        return `<div style="height:45px;">
                    <img title="` + data.processor.firstname + ` ` + data.processor.lastname + `" style="width: 45px; height:45px;border-radius: 10%;"
                    pictureid="` + data.processor.thumbnail.id + `" httpsrc="/api/rest/files/content/" alt="">
                </div>`;
                    } else if (data.processor != null && data.processor.thumbnail == null && data.processor.firstname != null && data.processor.lastname != null) {
                        return "<span style='font-weight:bold' title='" + data.processor.firstname + " " + data.processor.lastname + "'>" + data.processor.firstname[0] + data.processor.lastname[0] + "</span>";
                    } else {
                        return "-";
                    }
                }).withOption("width", "45px").notSortable(),
            this.DTColumnBuilder.newColumn(null).renderWith(
                function (data: Process, type, full) {
                    if (data != null && data.processor != null) {
                        return data.processor.email;
                    } else {
                        return "";
                    }
                }).notVisible(),
            this.DTColumnBuilder.newColumn("sale.customer.company").withTitle(
                this.translate("COMMON_COMPANY")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.customer.lastname").withTitle(
                this.translate("COMMON_NAME")).withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.customer.email").withTitle(
                this.translate("COMMON_EMAIL")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_PRODUCT_DESTINATION")).withClass("text-center").renderWith(function (data, type, full) {
                    let zip = "";
                    let city = "";
                    let country = "";
                    !isNullOrUndefined(data.sale.deliveryAddress.zip) ? zip = data.sale.deliveryAddress.zip : angular.noop;
                    !isNullOrUndefined(data.sale.deliveryAddress.city) ? city = data.sale.deliveryAddress.city : angular.noop;
                    !isNullOrUndefined(data.sale.deliveryAddress.country) ? country = data.sale.deliveryAddress.country : angular.noop;
                    return "<span class='text-ellipses' title='" + zip + " " + city + " " + country + "'>" + zip + " " + city + " " + country + "</span>";
                }),
            this.DTColumnBuilder.newColumn("sale.timestamp").withTitle(
                this.translate("COMMON_DATE")).renderWith(
                function (data, type, full) {
                    return toLocalDate(data, "DD.MM.YYYY HH:mm");
                }).withOption("type", "date-euro")
                .withClass("text-center"),
            this.DTColumnBuilder.newColumn("sale.customer.phone").withTitle(
                this.translate("COMMON_PHONE")).notVisible(),
            this.DTColumnBuilder.newColumn("sale.customer.firstname").withTitle(
                this.translate("COMMON_FIRSTNAME")).notVisible(),
            this.DTColumnBuilder.newColumn("sale.deliveryAddressLine").withTitle(
                this.translate("COMMON_PRODUCT_DESTINATION")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_PRODUCT_SALE_TURNOVER")).renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.sale.saleTurnover)) {
                        return self.filter("currency")(0, "€", 2);
                    }
                    return self.filter("currency")
                        (data.sale.saleTurnover, "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_PRODUCT_SALE_PROFIT")).renderWith(
                function (data, type, full) {
                    if (isNullOrUndefined(data.sale.saleProfit)) {
                        return self.filter("currency")(0, "€", 2);
                    }
                    return self.filter("currency")
                        (data.sale.saleProfit, "€", 2);
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_STATUS")).withClass("text-center")
                .renderWith(addStatusStyle),
            this.DTColumnBuilder.newColumn("sale.invoiceNumber").withTitle(
                this.translate("COMMON_PRODUCT_SALE_INVOICE_NUMBER")).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                this.translate("COMMON_BILLING_ADDRESS")).renderWith(function (data: Process, type, full) {
                    let street = "";
                    let streetNumber = "";
                    let zip = "";
                    let city = "";
                    let country = "";
                    !isNullOrUndefined(data.sale.billingAddress.street) ? street = data.sale.billingAddress.street : angular.noop;
                    !isNullOrUndefined(data.sale.billingAddress.number) ? streetNumber = data.sale.billingAddress.number : angular.noop;
                    !isNullOrUndefined(data.sale.billingAddress.zip) ? zip = data.sale.billingAddress.zip : angular.noop;
                    !isNullOrUndefined(data.sale.billingAddress.city) ? city = data.sale.billingAddress.city : angular.noop;
                    !isNullOrUndefined(data.sale.billingAddress.country) ? country = data.sale.billingAddress.country : angular.noop;
                    return street + " " + streetNumber + " " + zip + " " + city + " " + country;
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null).withTitle(
                "<span class='glyphicon glyphicon-cog'></span>").withClass(
                "text-center").withOption("width", "90px").notSortable().renderWith(addActionsButtons),
            this.DTColumnBuilder.newColumn(null).withTitle(this.translate("COMMON_PROCESSOR")).renderWith(
                function (data: Process, type, full) {
                    if (data != null && data.processor != null) {
                        return data.processor.firstname + " " + data.processor.lastname;
                    } else {
                        return "";
                    }
                }).notVisible(),
            this.DTColumnBuilder.newColumn(null)
                .renderWith(
                function (data, type, full) {
                    return "#id:" + data.id + "#";
                }).notVisible()];
    }

    getActionButtonConfig(process: Process): { [key: string]: ActionButtonConfig } {
        let user = new User();
        let rootScopeUser: User = this.rootScope.user;
        user.id = rootScopeUser.id;
        user.role = Role.SUPERADMIN;

        let config = new ActionButtonConfigBuilder();
        if (user.role === Role.ADMIN || user.role === Role.SUPERADMIN) {
            config.get(ActionButtonType.DETAILS_OPEN_DELETE_MODAL).setEnabled().setTitle("SALE_DELETE_SALE");
            config.get(ActionButtonType.DETAILS_OPEN_ROLLBACK_MODAL).setEnabled().setTitle("SALE_ROLLBACK_TITLE");
        } else {
            config.get(ActionButtonType.DETAILS_OPEN_DELETE_MODAL).setVisible()
                .setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("SALE_DELETE_SALE");
            config.get(ActionButtonType.DETAILS_OPEN_ROLLBACK_MODAL).setVisible()
                .setEnabled(isNullOrUndefined(process.processor) || process.processor.id === user.id).setTitle("SALE_ROLLBACK_TITLE");
        }
        config.get(ActionButtonType.QUICK_MAIL).setEnabled().setTitle("EMAIL_SEND");
        config.get(ActionButtonType.DETAILS_OPEN_EDIT_MODAL).setEnabled().setTitle("SALE_EDIT_SALE");
        config.get(ActionButtonType.DETAILS_DROPDOWN).setEnabled().setTitle("COMMON_DETAILS");
        if (!(user.role === Role.ADMIN || user.role === Role.SUPERADMIN) && (!isNullOrUndefined(process.processor) && process.processor.id !== user.id)) {
            config.disableAll();

        }
        return config.build();
    }

    configRow(row: any, data: Process) {
        let self = this;
        $(row).attr("id", "id_" + data.id);
        $("td:not(:last-child)", row).unbind("click");
        $("td:not(:last-child)", row).bind("click", function () {
            self.rootScope.$broadcast(broadcastClickChildrow, data);
        }).css("cursor", "pointer");
    }

    getActionButtonsHTML(process: Process, actionButtonConfig: { [key: number]: any }): string {
        actionButtonConfig[process.id] = this.getActionButtonConfig(process);
        return "<div actionbuttons minwidth='90' actionbuttonconfig=saleCtrl.actionButtonConfig[" + process.id + "]  process='saleCtrl.processes[" + process.id + "]'></div>";
    }

    getStatusStyleHTML(data: Process): string {
        return "<span style='color: #1872ab;'>"
            + this.translate.instant("COMMON_STATUS_SALE") + "</span>";
    }

}
angular.module(moduleSaleDataTableService, [ngResourceId]).service(SaleDataTableServiceId, SaleDataTableService);