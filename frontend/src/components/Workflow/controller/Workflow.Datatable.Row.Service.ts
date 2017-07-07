/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../User/Model/User.Model.ts" />
/// <reference path="../../Product/model/OrderPosition.Model.ts" />
/// <reference path="../../Process/model/Process.Model.ts" />
/// <reference path="../../Process/model/Activity.enum.ts" />
/// <reference path="../../Process/model/Processor.Model.ts" />
/// <reference path="../../Lead/model/Lead.Model.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../Customer/Controller/Customer.Service.ts" />
/// <reference path="../../Product/Controller/Product.Service.ts" />
/// <reference path="../../Workflow/model/Workflow.Map.Model.ts" />

const WorkflowDatatableRowServiceId: string = "WorkflowDatatableRowService";

class WorkflowDatatableRowService {

    $inject = [$rootScopeId, $translateId, toasterId, $compileId, ProcessServiceId];

    processService: ProcessService;
    translate;
    rootScope;
    toaster;
    compile;


    worfklowProcessMap: WorkflowProcessMap = new WorkflowProcessMap();
    constructor($rootScope, $translate, toaster, $compile, ProcessService) {
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.toaster = toaster;
        this.compile = $compile;
        this.processService = ProcessService;
    }

    setRow(id: number, workflowType: WorkflowType, row: any) {
        this.worfklowProcessMap[workflowType.toString().toLowerCase()][id] = row;
    }

    resetWorkflowProcessMap() {
        this.worfklowProcessMap = new WorkflowProcessMap();
    }

    updateRow(process: Process, dtInstance: any, workflowType: WorkflowType, scope: any) {
        if (!isNullOrUndefined(this.worfklowProcessMap[workflowType.toString().toLowerCase()][process.id])) {
            dtInstance.DataTable.row(this.worfklowProcessMap[workflowType.toString().toLowerCase()][process.id]).data(process);
            this.compile(angular.element(this.worfklowProcessMap[workflowType.toString().toLowerCase()][process.id]).contents())(scope);
        } else {
            dtInstance.DataTable.rows().every(function () {
                if (this.data().id === process.id) {
                    this.data(process);
                    this.invalidate();
                }
            });
        }
    }

    removeOrUpdateRow(process: Process, loadAllData: boolean, dtInstance: any, workflowType: WorkflowType, scope: any) {
        if (loadAllData === true) {
            this.updateRow(process, dtInstance, workflowType, scope);
        } else if (loadAllData === false) {
            this.deleteRow(process, dtInstance, workflowType);
        }
    }

    deleteRow(process: Process, dtInstance: any, workflowType: WorkflowType): void {
        dtInstance.DataTable.row(this.worfklowProcessMap[workflowType.toString().toLowerCase()][process.id]).remove().draw("page");
    }
}

angular.module(moduleWorkflowDatatableRowService, [ngResourceId]).service(WorkflowDatatableRowServiceId, WorkflowDatatableRowService);