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
/// <reference path="../../Process/controller/Process.Service.ts" />
/// <reference path="../../Workflow/model/WorkflowType.ts" />
/// <reference path="../../Workflow/controller/Workflow.Controller.ts" />
/// <reference path="../../Workflow/controller/Workflow.Modal.Service.ts" />
/// <reference path="../../Dashboard/controller/Dashboard.Controller.ts" />
/// <reference path="../../Customer/controller/Customer.Service.ts" />
/// <reference path="../../FileUpload/controller/File.Service.ts" />
/// <reference path="../../Wizard/controller/Wizard.Modal.Controller.ts" />

const WorkflowServiceId: string = "WorkflowService";

const openQuickEmailModal: string = "openQuickEmailModal";

class WorkflowService {

    private $inject = [CommentResourceId, SaleResourceId, OfferResourceId, toasterId, $rootScopeId, $translateId, $qId, CustomerServiceId, UserResourceId, ProcessServiceId, WorkflowModalServiceId, ApiServiceId];

    commentResource;
    saleResource;
    offerResource;
    userResource;
    processService: ProcessService;
    customerService: CustomerService;
    apiService: ApiService;
    workflowModalService: WorkflowModalService;
    toaster;
    rootScope;
    translate;
    $q;
    users: Array<User> = [];

    constructor(CommentResource, SaleResource, OfferResource, toaster, $rootScope, $translate, $q, CustomerService, UserResource, ProcessService, WorkflowModalService, ApiService) {
        this.commentResource = CommentResource.resource;
        this.saleResource = SaleResource.resource;
        this.userResource = UserResource.resource;
        this.offerResource = OfferResource.resource;
        this.toaster = toaster;
        this.processService = ProcessService;
        this.workflowModalService = WorkflowModalService;
        this.apiService = ApiService;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.$q = $q;
        this.customerService = CustomerService;
        this.refreshUsers();
        this.rootScope.$on(openQuickEmailModal, (event, data: { notification: EmailNotification, processId: number }) => {
            this.openQuickEmailModal(data.processId, data.notification);
        });

    }

    addComment(process: Process, commentText: string): Promise<boolean> {
        let defer = this.$q.defer();
        if (angular.isUndefined(commentText) || commentText === "") {
            defer.reject(false);
            return defer.promise;
        }
        if (isNullOrUndefined(process.comments)) {
            process.comments = new Array<Commentary>();
        }
        let self: WorkflowService = this;
        let comment: Commentary = {
            id: null,
            creator: this.rootScope.user,
            commentText: commentText,
            timestamp: newTimestamp()
        };

        this.commentResource.save({ id: process.id }, comment).$promise.then(function (result: Commentary) {
            let timestamp = toLocalDate(comment.timestamp, "DD.MM.YYYY HH:mm:ss");
            comment.timestamp = timestamp;
            result.creator = self.rootScope.user;
            process.comments.push(result);


            defer.resolve(true);
        }, function () {
            defer.reject(false);
        });
        return defer.promise;
    }

    getCommentsByProcessId(id: number): Array<Commentary> {
        let comments: Array<Commentary> = new Array<Commentary>();
        this.commentResource.getByProcessId({ id: id }).$promise.then(function (result) {
            for (let comment of result) {
                let timestamp = toLocalDate(comment.timestamp);
                comment.timestamp = timestamp;
                comments.push(comment);
            }
        });
        return comments;
    }

    sumOrderPositions(array: Array<OrderPosition>): number {
        let sum = 0;
        if (isNullOrUndefined(array)) {
            return 0;
        }
        for (let i = 0; i < array.length; i++) {
            let temp = array[i];
            if (!isNullOrUndefined(temp) && !isNaN(temp.amount)
                && !isNaN(temp.netPrice)) {
                sum += temp.amount * temp.netPrice;
            }
        }
        return Math.round(sum * 100) / 100;
    }

    sumBasicPriceOrderPositions(array: Array<OrderPosition>): number {
        let sum = 0;
        if (isNullOrUndefined(array)) {
            return 0;
        }
        for (let i = 0; i < array.length; i++) {
            let temp = array[i];
            if (!isNullOrUndefined(temp) && !isNaN(temp.amount)
                && !isNullOrUndefined(temp.product)
                && !isNaN(temp.product.netPrice)) {
                sum += temp.amount * temp.product.netPrice;
            }
        }
        return sum;
    }

    calculateDiscount(oldPrice: number, newPrice: number): number {
        let temp = Math.round((((oldPrice - newPrice) / oldPrice) * 100) * 100) / 100;
        return isNaN(temp) || temp < 0 ? 0 : temp;
    }

    calculatePrice(oldPrice: number, discount: number): number {
        let temp = Math.round((oldPrice * (1 - (discount / 100))) * 100) / 100;
        return isNaN(temp) ? 0 : temp;
    }

    getWorkflowTypeByProcess(process: Process): WorkflowType {
        if (this.isLead(process)) {
            return WorkflowType.LEAD;
        } else if (this.isOffer(process)) {
            return WorkflowType.OFFER;
        } else if (this.isSale(process)) {
            return WorkflowType.SALE;
        }
        else {
            return null;
        }
    }

    async startOfferTransformation(process: Process): Promise<Process> {
        return await this.workflowModalService.openOfferTransformationModal(process);
    }

    async startSaleTransformation(process: Process): Promise<Process> {
        return await this.workflowModalService.openSaleTransformationModal(process);
    }

    async openQuickEmailModal(process: Process | number, notification: EmailNotification = null): Promise<Process> {
        if (isNumeric(process)) {
            process = await this.processService.getById(process);
        }
        let workflowType: WorkflowType = this.getWorkflowTypeByProcess(process as Process);
        return await this.workflowModalService.openQuickEmailModal(process as Process, workflowType, notification);
    }

    async openNewLeadModal(): Promise<Process> {
        return await this.workflowModalService.openNewLeadModal();
    }

    async openEditModal(process: Process, workflowType: WorkflowType): Promise<Process> {
        return await this.workflowModalService.openEditModal(process, workflowType);
    }

    async openConfirmationModal(process: Process, confirmationFunctionType: ConfirmationFunctionType): Promise<Process> {
        return await this.workflowModalService.openConfirmationModal(process, confirmationFunctionType);
    }

    async addLeadToOffer(tempProcess: Process): Promise<Process> {
        tempProcess.formerProcessors = tempProcess.formerProcessors ? tempProcess.formerProcessors : [];
        if (!this.checkForDupsInFormerProcessors(tempProcess.formerProcessors, this.rootScope.user, Activity.OFFER)) {
            tempProcess.formerProcessors.push(new Processor(this.rootScope.user, Activity.OFFER));
        }
        tempProcess.status = Status.OFFER;
        tempProcess.processor = this.rootScope.user;
        let resultProcess: Process = await this.processService.save(tempProcess, tempProcess.offer, false, true) as Process;
        this.toaster.pop("success", "", this.translate.instant("COMMON_TOAST_SUCCESS_NEW_OFFER"));
        this.rootScope.leadsCount -= 1;
        this.rootScope.offersCount += 1;
        return resultProcess;
    }

    async addOfferToSale(tempProcess: Process): Promise<Process> {
        tempProcess.formerProcessors = tempProcess.formerProcessors ? tempProcess.formerProcessors : [];
        if (!this.checkForDupsInFormerProcessors(tempProcess.formerProcessors, this.rootScope.user, Activity.SALE)) {
            tempProcess.formerProcessors.push(new Processor(this.rootScope.user, Activity.SALE));
        }
        tempProcess.status = Status.SALE;
        tempProcess.processor = this.rootScope.user;
        let resultProcess = await this.processService.save(tempProcess, tempProcess.sale, false, true) as Process;
        let customer: Customer = resultProcess.offer.customer;
        if (!customer.realCustomer) {
            customer.realCustomer = true;
            let updatedCustomer: Customer = await this.customerService.updateCustomer(customer);
            resultProcess.offer.customer = updatedCustomer;
        }
        await this.apiService.weclappCreateCustomer(resultProcess);
        this.toaster.pop("success", "", this.translate.instant("COMMON_TOAST_SUCCESS_NEW_SALE"));
        this.rootScope.offersCount -= 1;
        return resultProcess;
    }

    refreshUsers(): void {
        this.userResource.getAll().$promise.then((data) => {
            this.users = data;
        }, (error) => handleError(error));

    }

    createNextWorkflowUnit(process: Process): void {
        switch (process.status) {
            case Status.OPEN: this.startOfferTransformation(process);
                break;
            case Status.INCONTACT: this.startOfferTransformation(process);
                break;
            case Status.OFFER: this.startSaleTransformation(process);
                break;
            case Status.FOLLOWUP: this.startSaleTransformation(process);
                break;
            case Status.DONE: this.startSaleTransformation(process);
                break;
            default: ;
                break;
        }
    }

    togglePin(process: Process, user: User) {
        let self = this;
        if (user !== null) {
            this.processService.setProcessor(process, user).then((result) => {
                process.processor = user;
                self.rootScope.$broadcast(broadcastOnTodosChanged);
                self.rootScope.$broadcast(broadcastUpdate, result);
                self.rootScope.$broadcast(broadcastUpdateChildrow, result);
            }, (error) => handleError(error));
        } else if (process.processor !== null) {
            this.processService.removeProcessor(process).then(function () {
                process.processor = null;
                self.rootScope.$broadcast(broadcastUpdate, process);
                self.rootScope.$broadcast(broadcastOnTodosChanged);
            }, (error) => handleError(error));
        }
    }

    async inContact(process: Process): Promise<Process> {
        process.status = Status.INCONTACT;
        process.processor = this.rootScope.user;
        if (isNullOrUndefined(process.formerProcessors)) {
            process.formerProcessors = [];
        }
        if (!this.checkForDupsInFormerProcessors(process.formerProcessors, this.rootScope.user, Activity.INCONTACT)) {
            process.formerProcessors.push(new Processor(process.processor, Activity.INCONTACT));
        }
        let resultProcess = await this.processService.save(process, null, false, false) as Process;
        this.rootScope.$broadcast(broadcastOnTodosChanged);
        this.rootScope.$broadcast(broadcastUpdate, resultProcess);
        this.rootScope.$broadcast(broadcastUpdateChildrow, resultProcess);
        this.toaster.pop("success", "", this.translate.instant("COMMON_TOAST_SUCCESS_INCONTACT"));
        return resultProcess;
    }

    async doneOffer(process: Process): Promise<Process> {
        let toastMsg: string = "";
        if (process.status === Status.OFFER || process.status === Status.FOLLOWUP) {
            process.status = Status.DONE;
            toastMsg = "COMMON_TOAST_SUCCESS_DONE_OFFER";
            process.processor = null;
        } else if (process.status === Status.DONE) {
            if (process.followUpAmount > 0) {
                process.status = Status.FOLLOWUP;
            } else {
                process.status = Status.OFFER;
            }
            toastMsg = "COMMON_TOAST_SUCCESS_REVERT_DONE_OFFER";
            process.processor = this.rootScope.user;
        }
        let resultProcess = await this.processService.save(process, null, true, false) as Process;
        this.rootScope.$broadcast(broadcastOnTodosChanged);
        this.toaster.pop("success", "", this.translate.instant(toastMsg));
        return resultProcess;
    }

    async toggleClosedOrOpenState(process: Process): Promise<void> {
        let resultProcess: Process;
        if (process.status !== Status.CLOSED) {
            resultProcess = await this.processService.setStatus(process, Status.CLOSED);
            await this.processService.removeProcessor(resultProcess);
            resultProcess.processor = null;
            if (isNullOrUndefined(process.offer) && isNullOrUndefined(process.sale)) {
                this.rootScope.leadsCount -= 1;
            } else if (!isNullOrUndefined(process.offer) && isNullOrUndefined(process.sale)) {
                this.rootScope.offersCount -= 1;
            }
            this.rootScope.$broadcast(broadcastRemoveOrUpdate, resultProcess);
            this.rootScope.$broadcast(broadcastOnTodosChanged, resultProcess);
        } else if (isNullOrUndefined(process.offer) && isNullOrUndefined(process.sale)) {
            resultProcess = await this.processService.setStatus(process, Status.OPEN);
            this.rootScope.leadsCount += 1;
            this.rootScope.$broadcast(broadcastUpdate, resultProcess);
        } else if (!isNullOrUndefined(process.offer) && isNullOrUndefined(process.sale)) {
            resultProcess = await this.processService.setStatus(process, Status.OFFER);
            this.rootScope.offersCount += 1;
            this.rootScope.$broadcast(broadcastUpdate, resultProcess);
        }
    }

    async rollBackOffer(process: Process): Promise<Process> {
        if (isNullOrUndefined(process)) {
            return;
        }
        let offerId = process.offer.id;
        process.offer = null;
        process.status = Status.OPEN;

        let resultProcess = await this.processService.save(process, null, false, true) as Process;
        this.offerResource.drop({ id: offerId });
        this.rootScope.leadsCount += 1; this.rootScope.offersCount -= 1;
        return resultProcess;
    }

    async rollBackSale(process: Process): Promise<Process> {
        if (isNullOrUndefined(process)) {
            return;
        }
        let saleId = process.sale.id;
        process.sale = null;
        process.status = Status.OFFER;
        let self = this;
        let resultProcess = await this.processService.save(process, null, false, true) as Process;
        self.saleResource.drop({ id: saleId });
        this.rootScope.offersCount += 1; this.rootScope.salesCount -= 1;
        return resultProcess;
    }

    async deleteProcess(process: Process): Promise<Process> {
        let resultProcess = await this.processService.delete(process) as Process;
        this.toaster.pop("success", "", this.translate
            .instant("COMMON_TOAST_SUCCESS_DELETE_LEAD"));
        if (this.isLead(process)) {
            this.rootScope.leadsCount -= 1;
        }
        else if (this.isOffer(process)) {
            this.rootScope.offersCount -= 1;
        }
        this.rootScope.$broadcast(broadcastOnTodosChanged);
        this.rootScope.$broadcast(broadcastRemove, process);
        return resultProcess;
    }

    checkForDupsInFormerProcessors(formerProcessors: Array<Processor>, user: User, activity: Activity): boolean {
        if (isNullOrUndefined(formerProcessors)) {
            return false;
        }
        return formerProcessors.filter(fp => fp.user.id === user.id && fp.activity === activity).length > 0;
    }

    async getSaleByInvoiceNumber(invoiceNumber: string): Promise<Array<Sale>> {
        return await this.saleResource.getByinvoiceNumber({}, invoiceNumber).$promise as Array<Sale>;
    }

    isLead(process: Process): boolean {
        return !isNullOrUndefined(process) && (process.status === Status.OPEN || process.status === Status.INCONTACT);
    }

    isOffer(process: Process): boolean {
        return !isNullOrUndefined(process) && (process.status === Status.OFFER || process.status === Status.FOLLOWUP || process.status === Status.DONE);
    }

    isSale(process: Process): boolean {
        return !isNullOrUndefined(process) && (process.status === Status.SALE);
    }
}
angular.module(moduleWorkflowService, [ngResourceId]).service(WorkflowServiceId, WorkflowService);
