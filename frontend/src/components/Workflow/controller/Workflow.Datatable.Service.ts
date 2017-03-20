/// <reference path="../../Product/model/Product.Model.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Product/controller/Product.Service.ts" />
/// <reference path="../../Product/model/OrderPosition.Model.ts" />
/// <reference path="../../Commentary/model/Commentary.Model.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.TokenService.ts" />
/// <reference path="../../Process/model/Status.Model.ts" />
/// <reference path="../../Workflow/model/WorkflowType.ts" />
/// <reference path="../../Workflow/controller/Workflow.Controller.ts" />
/// <reference path="../../Dashboard/controller/Dashboard.Controller.ts" />
/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../FileUpload/controller/File.Service.ts" />
/// <reference path="../../Wizard/controller/Wizard.Modal.Controller.ts" />

const WorkflowDatatableServiceId: string = "WorkflowDatatableService";

class WorkflowDatatableService {

    private $inject = [$rootScopeId, $compileId, TokenServiceId, $httpId];

    rootScope;
    compile;

    constructor($rootScope, $compile, private TokenService: TokenService, private $http) {
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

    async changeDataInput(loadAllData: boolean, dtOptions: any, allDataRoute: string, latestDataRoute: string) {
        let searchDelay: number = 0;
        let self = this;
        if (loadAllData === true) {
            searchDelay = 600;
        }
        dtOptions.withOption("serverSide", loadAllData)
            .withOption("ajax", await self.getData(loadAllData, allDataRoute, latestDataRoute))
            .withOption("searchDelay", searchDelay);
    }

    async getData(loadAllData: boolean, allDataRoute: string, latestDataRoute: string): Promise<any> {
        let self = this;
        if (loadAllData === true) {
            let token = await self.TokenService.getAccessTokenPromise();
            return {
                url: allDataRoute,
                type: "GET",
                pages: 2,
                dataSrc: "data",
                error: function (xhr, error, thrown) {
                    handleError(xhr);
                },
                beforeSend: function (request) {
                    request.setRequestHeader("X-Authorization", "Bearer " + token);
                }
            };



        } else {
            return (data, callback, settings) => {
                self.$http.get(latestDataRoute).then(function (response) {
                    callback(response.data);
                });
            };

        }
    }

    appendChildRow(childScope: any, process: Process, workflowUnit: IWorkflow, dtInstance: any, parent: WorkflowController, type: string) {
        childScope.workflowUnit = workflowUnit;
        childScope.process = process;
        childScope.parent = parent;
        childScope.type = type;

        let tr = angular.element("#id_" + process.id), table = dtInstance.DataTable, row = table
            .row(tr);

        if (row.child.isShown()) {
            let newChildRow = $("#childRow" + process.id);
            newChildRow.removeClass("openMenu");
            newChildRow.parent().parent().children("td").css("height", "0px");
            setTimeout(function () {
                row.child.hide();
                tr.removeClass("shown");
                childScope.$destroy();
            }, 300);
        } else {
            let childRow = row.child(
                this.compile(
                    "<div childrow id='childRow" + process.id + "' type='" + type + "' class='clearfix closeMenuChildRow'></div>")(
                    childScope));
            childRow.show();
            tr.addClass("shown");
            let newChildRow = $("#childRow" + process.id);
            newChildRow.parent().parent().children("td").css("height", "0px");
            newChildRow.parent().parent().addClass("childstyle");
            setTimeout(function () {
                newChildRow.addClass("openMenu");
            }, 100);
        }
    }
}
angular.module(moduleWorkflowDatatableService, [ngResourceId]).service(WorkflowDatatableServiceId, WorkflowDatatableService);
