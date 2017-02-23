/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Product/model/OrderPosition.Model.ts" />
/// <reference path="../../Commentary/model/Commentary.Model.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../Process/model/Status.Model.ts" />
/// <reference path="../../Workflow/model/WorkflowType.ts" />
/// <reference path="../../Workflow/controller/Workflow.Controller.ts" />
/// <reference path="../../Dashboard/controller/Dashboard.Controller.ts" />
/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../FileUpload/controller/File.Service.ts" />
/// <reference path="../../Wizard/controller/Wizard.Modal.Controller.ts" />

const WorkflowDatatableServiceId: string = "WorkflowDatatableService";

class WorkflowDatatableService {

    private $inject = [$rootScopeId, $compileId, TokenServiceId];

    rootScope;
    compile;

    constructor($rootScope, $compile, private TokenService: TokenService) {
        this.rootScope = $rootScope;
        this.compile = $compile;
    }

    getButtons(title: string, columns: Array<number>): Array<any> {
        return [{
            extend: "copyHtml5",
            exportOptions: {
                columns: columns,
                modifier: {
                    page: "current"
                }
            }
        }, {
            extend: "print",
            orientation: "landscape",
            title: title,
            exportOptions: {
                columns: columns,
                modifier: {
                    page: "current"
                }
            }
        }, {
            extend: "csvHtml5",
            title: title,
            exportOptions: {
                columns: columns,
                modifier: {
                    page: "current"
                }

            }
        }, {
            extend: "excelHtml5",
            title: title,
            exportOptions: {
                columns: columns,
                modifier: {
                    page: "current"
                }
            }
        }, {
            extend: "pdfHtml5",
            title: title,
            orientation: "landscape",
            exportOptions: {
                columns: columns,
                modifier: {
                    page: "current"
                }
            }
        }];
    }

    getDomString(): string {
        return "<'row'<'col-sm-12'l>>" + "<'row'<'col-sm-6'B><'col-sm-6'f>>"
            + "<'row'<'col-sm-12'tr>>"
            + "<'row'<'col-sm-5'i><'col-sm-7'p>>";
    }

    getLanguageSource(language: string): string {
        switch (language) {
            case Language[Language.DE]:
                return "/assets/datatablesTranslationFiles/German.json";
            case Language[Language.EN]:
                return "/assets/datatablesTranslationFiles/English.json";
            default:
                return "/assets/datatablesTranslationFiles/English.json";
        }
    }

    changeDataInput(loadAllData: boolean, dtOptions: any, allDataRoute: string, latestDataRoute: string) {
        let searchDelay: number = 0;
        if (loadAllData === true) {
            searchDelay = 600;
        }
        dtOptions.withOption("serverSide", loadAllData)
            .withOption("ajax", this.getData(loadAllData, allDataRoute, latestDataRoute))
            .withOption("searchDelay", searchDelay);
    }

    getData(loadAllData: boolean, allDataRoute: string, latestDataRoute: string): any {
        let self = this;
        if (loadAllData === true) {
            return {
                url: allDataRoute,
                type: "GET",
                pages: 2,
                dataSrc: "data",
                error: function (xhr, error, thrown) {
                    handleError(xhr);
                },
                "beforeSend": function (request) {
                    request.setRequestHeader("X-Authorization", "Bearer " + self.TokenService.getAccessTokenInstant());
                }
            };
        } else {
            return {
                url: latestDataRoute,
                error: function (xhr, error, thrown) {
                    handleError(xhr);
                },
                type: "GET",
                "beforeSend": function (request) {
                    request.setRequestHeader("X-Authorization", "Bearer " + self.TokenService.getAccessTokenInstant());
                }
            };
        }
    }

    appendChildRow(childScope: any, process: Process, workflowUnit: IWorkflow, dtInstance: any, parent: WorkflowController, type: string) {
        childScope.workflowUnit = workflowUnit;
        childScope.process = process;
        childScope.parent = parent;
        childScope.type = type;

        let link = angular.element("#id_" + process.id), icon = link
            .find(".glyphicon"), tr = link.parent().parent(), table = dtInstance.DataTable, row = table
                .row(tr);

        if (row.child.isShown()) {
            icon.removeClass("glyphicon-minus-sign")
                .addClass("glyphicon-plus-sign");
            row.child.hide();
            tr.removeClass("shown");
            childScope.$destroy();
        } else {
            icon.removeClass("glyphicon-plus-sign")
                .addClass("glyphicon-minus-sign");
            let childRow = row.child(
                this.compile(
                    "<div childrow id='childRow" + process.id + "' type='" + type + "' class='clearfix'></div>")(
                    childScope));
            childRow.show();
            tr.addClass("shown");
            let newChildRow = angular.element("#childRow" + process.id).parent().parent();
            newChildRow.addClass("childstyle");
        }
    }
}
angular.module(moduleWorkflowDatatableService, [ngResourceId]).service(WorkflowDatatableServiceId, WorkflowDatatableService);
