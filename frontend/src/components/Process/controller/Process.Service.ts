const ProcessServiceId: string = "ProcessService";

class ProcessService {

    private $inject = [ProcessResourceId, CustomerServiceId, toasterId, $rootScopeId, $translateId];

    processResource: any;
    customerService: CustomerService;
    toaster: any;
    rootScope: any;
    translate: any;

    constructor(ProcessResource, CustomerService, toaster, $rootScope, $translate) {
        this.processResource = ProcessResource.resource;
        this.customerService = CustomerService;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
    }

    async save(editProcess: Process, editWorkflowUnit: IWorkflow, updateRow: boolean, deleteRow: boolean): Promise<Process> {
        if (!isNullOrUndefined(editWorkflowUnit) && isNullOrUndefined(editWorkflowUnit.customer.id)) {
            editWorkflowUnit.customer.timestamp = newTimestamp();
            editWorkflowUnit.customer = await this.customerService.insertCustomer(editWorkflowUnit.customer) as Customer;
        } else if (!isNullOrUndefined(editWorkflowUnit)) {
            editWorkflowUnit.customer = await this.customerService.updateCustomer(editWorkflowUnit.customer) as Customer;
        }

        let resultProcess: Process = await this.processResource.save(editProcess).$promise as Process;
        if (updateRow === true) {
            this.rootScope.$broadcast(broadcastUpdate, resultProcess);
        }
        if (deleteRow === true) {
            this.rootScope.$broadcast(broadcastRemove, resultProcess);
        }
        this.rootScope.$broadcast(broadcastOnTodosChanged);
        return resultProcess;
    }

    async delete(process): Promise<Process> {
        if (isNullOrUndefined(process)) {
            return;
        }
        return await this.processResource.drop({ id: process.id }).$promise as Process;
    }

    async setStatus(process: Process, status: Status): Promise<Process> {
        if (isNullOrUndefined(process) || isNullOrUndefined(status)) {
            return;
        }
        return await this.processResource.setStatus({ id: process.id }, status).$promise as Process;
    }

    async setProcessor(process: Process, user: User): Promise<Process> {
        if (isNullOrUndefined(process) || isNullOrUndefined(user)) {
            return;
        }
        return await this.processResource.setProcessor({ id: process.id }, user.id).$promise as Process;
    }

    async removeProcessor(process: Process): Promise<Process> {
        if (isNullOrUndefined(process)) {
            return;
        }
        return await this.processResource.removeProcessor({ id: process.id }).$promise as Process;
    }
    async getById(processId): Promise<Process> {
        return this.processResource.getById({ id: processId }).$promise;
    }
}
angular.module(moduleProcessService, [ngResourceId]).service(ProcessServiceId, ProcessService);
