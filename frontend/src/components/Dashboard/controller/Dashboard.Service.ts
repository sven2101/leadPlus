/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../lead/model/Lead.Model.ts" />
/// <reference path="../../offer/model/Offer.Model.ts" />
/// <reference path="../../sale/model/Sale.Model.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../Process/model/Process.Model.ts" />
/// <reference path="../../Workflow/controller/Workflow.Controller.ts" />


/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH. All rights reserved.
 * 
 * NOTICE: All information contained herein is, and remains the property of
 * Eviarc GmbH and its suppliers, if any. The intellectual and technical
 * concepts contained herein are proprietary to Eviarc GmbH, and are protected
 * by trade secret or copyright law. Dissemination of this information or
 * reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from Eviarc GmbH.
 ******************************************************************************/
"use strict";

const DashboardServiceId: string = "DashboardService";
const broadcastOnTodosChanged: string = "onTodosChange";

class DashboardService {

    private $inject = [ProcessResourceId, toasterId, $rootScopeId, $translateId, WorkflowServiceId, $uibModalId, $qId, SweetAlertId, WorkflowDatatableServiceId];

    processResource: any;
    workflowService: WorkflowService;
    workflowDatatableService: WorkflowDatatableService;
    toaster: any;
    translate: any;
    rootScope: any;
    q: any;
    dragging: Boolean = false;
    inModal: Boolean = false;

    openLeads: Array<Process> = [];
    inContacts: Array<Process> = [];
    openOffers: Array<Process> = [];
    doneOffers: Array<Process> = [];
    closedSales: Array<Process> = [];
    elementToDelete: Array<Process> = [];
    delementDropzoneVisibility: string = "hidden";

    allDataLoad: boolean = false;
    tempUpdatedProcess: Process;

    openLeadsValue: number = 0;
    inContactsValue: number = 0;
    openOffersValue: number = 0;
    doneOffersValue: number = 0;
    closedSalesValue: number = 0;
    SweetAlert: any;
    uibModal;
    todos: any = { content: [] };
    dropzoneClass = {
        lead: "none",
        contact: "none",
        offer: "none",
        done: "none",
        sale: "none",
    };

    searchText: string = null;
    showMyTaskUserId: number = 0;
    direction: string = "ASC";


    constructor(ProcessResource, toaster, $rootScope, $translate, WorkflowService, $uibModal, $q, SweetAlert, WorkflowDatatableService) {
        this.processResource = ProcessResource.resource;
        this.workflowService = WorkflowService;
        this.workflowDatatableService = WorkflowDatatableService;
        this.toaster = toaster;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.q = $q;
        this.SweetAlert = SweetAlert;
        this.uibModal = $uibModal;

        $rootScope.$on(broadcastOnTodosChanged, (event) => {
            this.refreshTodos();
        });

        let self = this;
        setInterval(function () {
            self.refreshTodos();
        }, 10 * 60 * 1000);
    }

    initDashboard(withLaoading: boolean, loadSums: boolean) {
        let self = this;
        this.allDataLoad = !withLaoading;
        let open: Array<Process> = new Array<Process>();
        let contact: Array<Process> = new Array<Process>();
        let openOffer: Array<Process> = new Array<Process>();
        let done: Array<Process> = new Array<Process>();
        let sale: Array<Process> = new Array<Process>();
        let leadLoad: boolean = false;
        let contactLoad: boolean = false;
        let offerLoad: boolean = false;
        let doneLoad: boolean = false;
        let saleLoad: boolean = false;

        this.processResource.getExtendedProcessPage({ status: Status.OPEN }, { properties: "lead.timestamp", size: 8, page: 0, direction: this.direction, searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
            open = result.content;
            leadLoad = true;
            self.loadDataToDashboard(open, contact, openOffer, done, sale, leadLoad, contactLoad, offerLoad, doneLoad, saleLoad, loadSums);
        });

        this.processResource.getExtendedProcessPage({ status: Status.INCONTACT }, { properties: "lead.timestamp", size: 8, page: 0, direction: this.direction, searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
            contact = result.content;
            contactLoad = true;
            self.loadDataToDashboard(open, contact, openOffer, done, sale, leadLoad, contactLoad, offerLoad, doneLoad, saleLoad, loadSums);
        });

        this.processResource.getExtendedProcessPage({ status: Status.OFFER }, { properties: "offer.timestamp", size: 8, page: 0, direction: this.direction, searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
            openOffer = result.content;
            offerLoad = true;
            self.loadDataToDashboard(open, contact, openOffer, done, sale, leadLoad, contactLoad, offerLoad, doneLoad, saleLoad, loadSums);
        });

        this.processResource.getExtendedProcessPage({ status: Status.DONE }, { properties: "offer.timestamp", size: 8, page: 0, direction: this.direction, searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
            done = result.content;
            doneLoad = true;
            self.loadDataToDashboard(open, contact, openOffer, done, sale, leadLoad, contactLoad, offerLoad, doneLoad, saleLoad, loadSums);
        });

        this.processResource.getExtendedProcessPage({ status: Status.SALE }, { properties: "sale.timestamp", size: 7, page: 0, direction: this.direction, searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
            sale = result.content;
            saleLoad = true;
            self.loadDataToDashboard(open, contact, openOffer, done, sale, leadLoad, contactLoad, offerLoad, doneLoad, saleLoad, loadSums);
        });

    }

    loadDataToDashboard(open, contact, openOffer, done, sale, leadLoad: boolean, contactLoad: boolean, offerLoad: boolean, doneLoad: boolean, saleLoad: boolean, loadSums: boolean) {
        if (leadLoad === true && contactLoad === true && offerLoad === true && doneLoad === true && saleLoad === true) {
            if (loadSums === true) {
                this.sumLeads();
                this.sumInContacts();
                this.sumOffers();
                this.sumDoneOffers();
                this.sumSales();
            }
            this.openLeads = open;
            this.inContacts = contact;
            this.openOffers = openOffer;
            this.doneOffers = done;
            this.closedSales = sale;
            this.allDataLoad = true;
        }
    }

    updateProcessElement(oldProcess: Process, process: Process, updateNow: boolean) {
        if (updateNow === false) {
            this.tempUpdatedProcess = process;
        } else if (updateNow === true) {
            this.updateElementInArray(this.openLeads, oldProcess, process);
            this.updateElementInArray(this.inContacts, oldProcess, process);
            this.updateElementInArray(this.openOffers, oldProcess, process);
            this.updateElementInArray(this.doneOffers, oldProcess, process);
        }

    }

    sumLeads(): void {
        let self = this;
        this.openLeadsValue = 0;
        this.processResource.getSumByStatus({ status: Status.OPEN }, { searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
            self.openLeadsValue = result.value;
        });
    }

    sumInContacts(): void {
        let self = this;
        this.inContactsValue = 0;
        this.processResource.getSumByStatus({ status: Status.INCONTACT }, { searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
            self.inContactsValue = result.value;
        });
    }
    sumOffers(): void {
        let self = this;
        this.openOffersValue = 0;
        this.processResource.getSumByStatus({ status: Status.OFFER }, { searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
            self.openOffersValue = result.value;
        });
    }

    sumDoneOffers(): void {
        let self = this;
        this.doneOffersValue = 0;
        this.processResource.getSumByStatus({ status: Status.DONE }, { searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
            self.doneOffersValue = result.value;
        });
    }

    sumSales(): void {
        let self = this;
        this.closedSalesValue = 0;
        this.processResource.getSumByStatus({ status: Status.SALE }, { searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
            self.closedSalesValue = result.value;
        });
    }

    setSortableOptions(scope: any): any {
        let self: DashboardService = this;
        let sortableList = {
            start: function (e, ui) {
                let source = ui.item.sortable.sourceModel;
                self.delementDropzoneVisibility = "show";
                self.dragging = true;
                if (source === self.openLeads) {
                    self.dropzoneClass.contact = "2px dashed grey";
                    self.dropzoneClass.offer = "2px dashed grey";
                }
                else if (source === self.inContacts) {
                    self.dropzoneClass.offer = "2px dashed grey";
                }
                else if (source === self.openOffers) {
                    self.dropzoneClass.done = "2px dashed grey";
                    self.dropzoneClass.sale = "2px dashed grey";
                }
                else if (source === self.doneOffers) {
                    self.dropzoneClass.offer = "2px dashed grey";
                    self.dropzoneClass.sale = "2px dashed grey";
                }
                else if (source === self.closedSales) {
                    self.dropzoneClass.sale = "2px dashed grey";
                }
                scope.$apply();
            },
            update: function (e, ui) {
                let target = ui.item.sortable.droptargetModel;
                let source = ui.item.sortable.sourceModel;
                let item = ui.item.sortable.model;
                if ((self.openLeads === target && self.openOffers === source) ||
                    (self.openLeads === target && self.inContacts === source) ||
                    (self.openLeads === target && self.doneOffers === source) ||
                    (self.inContacts === target && self.openOffers === source) ||
                    (self.inContacts === target && self.doneOffers === source) ||
                    (self.inContacts === target && self.closedSales === source) ||
                    (self.doneOffers === target && self.openLeads === source) ||
                    (self.doneOffers === target && self.inContacts === source) ||
                    (self.closedSales === target && self.inContacts === source) ||
                    (self.closedSales === target && self.openLeads === source) ||
                    target === source) {

                    ui.item.sortable.cancel();
                }
            },
            stop: async function (e, ui) {
                let target = ui.item.sortable.droptargetModel;
                let source = ui.item.sortable.sourceModel;
                let item = ui.item.sortable.model;

                self.delementDropzoneVisibility = "hidden";
                self.dragging = false;
                self.dropzoneClass.lead = "none";
                self.dropzoneClass.contact = "none";
                self.dropzoneClass.offer = "none";
                self.dropzoneClass.done = "none";
                self.dropzoneClass.sale = "none";

                if (self.closedSales === target && self.openOffers === source
                    || self.closedSales === target && self.doneOffers === source) {
                    self.inModal = true;
                    self.startSaleTransformation(item).then(function (result: Process) {
                        if (result === undefined) {
                            item.sale = undefined;
                            target.splice(target.indexOf(item), 1);
                            source.push(self.getUpdatedItem(item));
                            self.inModal = false;
                            self.orderProcessByTimestamp(source, "offer", self.direction);
                        } else {
                            let index = target.indexOf(item);
                            target[index] = result;
                            self.workflowDatatableService.addElementToCache(WorkflowType.SALE, result);
                            self.workflowDatatableService.removeElementFromCache(WorkflowType.OFFER, result);
                            self.inModal = false;
                            if (self.openOffers === source) {
                                self.openOffersValue -= result.offer.netPrice;
                                self.updateDashboard("offer");
                            } else if (self.doneOffers === source) {
                                self.doneOffersValue -= result.offer.netPrice;
                                self.updateDashboard("done");
                            }
                            self.closedSalesValue += result.sale.saleTurnover;
                        }
                    }, function (result) {
                        item.sale = undefined;
                        target.splice(target.indexOf(item), 1);
                        source.push(self.getUpdatedItem(item));
                        self.inModal = false;
                        self.orderProcessByTimestamp(source, "offer", self.direction);
                    });
                }
                else if (self.openOffers === target && self.openLeads === source
                    || self.openOffers === target && self.inContacts === source) {
                    self.inModal = true;
                    self.startOfferTransformation(item).then(function (result: Process) {
                        if (result === undefined) {
                            item.offer = undefined;
                            target.splice(target.indexOf(item), 1);
                            source.push(self.getUpdatedItem(item));
                            self.inModal = false;
                            self.orderProcessByTimestamp(source, "lead", self.direction);
                        } else {
                            let index = target.indexOf(item);
                            target[index] = result;
                            self.workflowDatatableService.addElementToCache(WorkflowType.OFFER, result);
                            self.workflowDatatableService.removeElementFromCache(WorkflowType.LEAD, result);
                            self.inModal = false;
                            self.orderProcessByTimestamp(target, "offer", self.direction);
                            if (self.openLeads === source) {
                                self.openLeadsValue -= result.offer.netPrice;
                                self.updateDashboard("lead");
                            } else if (self.inContacts === source) {
                                self.inContactsValue -= result.offer.netPrice;
                                self.updateDashboard("incontact");
                            }
                            self.openOffersValue += result.offer.netPrice;
                        }
                    }, function (result) {
                        item.offer = undefined;
                        target.splice(target.indexOf(item), 1);
                        source.push(self.getUpdatedItem(item));
                        self.inModal = false;
                        self.orderProcessByTimestamp(source, "lead", self.direction);
                    });
                }
                else if (self.inContacts === target && self.openLeads === source) {
                    self.inContact(item).then(function (result: Process) {
                        let index = target.indexOf(item);
                        target[index] = result;
                        let leadOrderpositionValue = self.workflowService.sumOrderPositions(result.lead.orderPositions);
                        self.openLeadsValue -= leadOrderpositionValue;
                        self.inContactsValue += leadOrderpositionValue;
                        self.workflowDatatableService.updateCache(WorkflowType.LEAD, result);
                        self.orderProcessByTimestamp(target, "lead", self.direction);
                        self.updateDashboard("lead");
                    }, function (error) {
                        self.inconsistencySweetAlert(error);
                    });
                }
                else if (self.doneOffers === target && self.openOffers === source) {
                    self.doneOffer(item).then(function (result: Process) {
                        let index = target.indexOf(item);
                        target[index] = result;
                        self.openOffersValue -= result.offer.netPrice;
                        self.doneOffersValue += result.offer.netPrice;
                        self.workflowDatatableService.updateCache(WorkflowType.OFFER, result);
                        self.orderProcessByTimestamp(target, "offer", self.direction);
                        self.updateDashboard("offer");
                    }, function (error) {
                        self.inconsistencySweetAlert(error);
                    });
                }
                else if (self.openOffers === target && self.doneOffers === source) {
                    self.doneOffer(item).then(function (result: Process) {
                        let index = target.indexOf(item);
                        target[index] = result;
                        self.doneOffersValue -= result.offer.netPrice;
                        self.openOffersValue += result.offer.netPrice;
                        self.workflowDatatableService.updateCache(WorkflowType.OFFER, result);
                        self.orderProcessByTimestamp(target, "offer", self.direction);
                        self.updateDashboard("done");
                    }, function (error) {
                        self.inconsistencySweetAlert(error);
                    });
                }
                else if (target === self.elementToDelete) {
                    let title = "";
                    let text = "";
                    if (source === self.openLeads || source === self.inContacts) {
                        title = self.translate.instant("LEAD_CLOSE_LEAD");
                        text = self.translate.instant("LEAD_CLOSE_LEAD_REALLY");
                    } else if (source === self.openOffers || source === self.doneOffers) {
                        title = self.translate.instant("OFFER_CLOSE_OFFER");
                        text = self.translate.instant("OFFER_CLOSE_OFFER_REALLY");
                    }

                    self.inModal = true;
                    let deletePromise = self.SweetAlert.swal({
                        title: title,
                        text: text,
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: self.translate.instant("NO"),
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: self.translate.instant("YES"),
                    });

                    try {
                        await deletePromise;
                        self.closeProcess(item, source);
                        target.splice(source.indexOf(item), 1);
                        if (source === self.openLeads || source === self.inContacts) {
                            self.workflowDatatableService.removeElementFromCache(WorkflowType.LEAD, item);
                        } else if (source === self.openOffers || source === self.doneOffers) {
                            self.workflowDatatableService.removeElementFromCache(WorkflowType.OFFER, item);
                        }
                        let todoElement: Process = findElementById(self.todos, item.id) as Process;
                        if (!isNullOrUndefined(todoElement)) {
                            self.todos.splice(self.todos.indexOf(todoElement), 1);
                            self.rootScope.$broadcast("todosChanged", self.todos);
                        }
                        self.inModal = false;
                    } catch (error) {
                        target.splice(target.indexOf(item), 1);
                        source.push(item);
                        self.inModal = false;
                        if (source === self.openLeads || source === self.inContacts) {
                            self.orderProcessByTimestamp(source, "lead", self.direction);
                        } else if (source === self.openOffers || source === self.doneOffer) {
                            self.orderProcessByTimestamp(source, "offer", self.direction);
                        }
                    }
                }
            },
            connectWith: ".connectList",
            items: "li:not(.not-sortable)"
        };
        return sortableList;
    }

    async inconsistencySweetAlert(error) {
        this.inModal = true;
        let refreshPromise = this.SweetAlert.swal({
            text: getConsistencyErrorMessage(error, this.translate, this.translate.instant("PROCESS_PROCESS")),
            type: "warning",
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK",
        });

        await refreshPromise;
        this.initDashboard(true, true);
        this.inModal = false;
    }

    removeFromSourceAndAddToTarget(target: Array<Process>, source: Array<Process>, item: Process, replaceItem) {
        if (source.indexOf(item) > -1) {
            target.push(replaceItem);
            source.splice(source.indexOf(item), 1);
        } else if (target.indexOf(item) > -1) {
            target[target.indexOf(item)] = replaceItem;
        }
    }

    getUpdatedItem(item: Process): Process {
        if (!isNullOrUndefined(this.tempUpdatedProcess) && this.tempUpdatedProcess.id === item.id && this.tempUpdatedProcess.status === item.status) {
            return deepCopy(this.tempUpdatedProcess);
        } else {
            return item;
        }
    }

    updateElementInArray(target: Array<Process>, item: Process, replaceItem) {
        if (target.indexOf(item) > -1) {
            target[target.indexOf(item)] = replaceItem;
        }
    }

    sliceElementFromArray(arr: Array<Process>, item: Process) {
        if (arr.indexOf(item) > -1) {
            arr.splice(arr.indexOf(item), 1);
        }
    }

    addNewLead(process: Process) {
        this.openLeads.push(process);
        this.openLeads = this.orderProcessByTimestamp(this.openLeads, "lead", this.direction);
        this.openLeadsValue = this.workflowService.sumOrderPositions(process.lead.orderPositions);
    }

    updateDashboard(type: string) {
        let self = this;
        if (type === "lead" && self.openLeads.length === 7) {
            this.processResource.getProcessPage({ status: Status.OPEN }, { properties: "lead.timestamp", size: 10, page: 0, direction: this.direction, searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
                self.updateArray(self.openLeads, result.content, WorkflowType.LEAD);
            });
        } else if (type === "incontact" && self.inContacts.length === 7) {
            this.processResource.getProcessPage({ status: Status.INCONTACT }, { properties: "lead.timestamp", size: 10, page: 0, direction: this.direction, searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
                self.updateArray(self.inContacts, result.content, WorkflowType.LEAD);
            });
        }
        else if (type === "offer" && self.openOffers.length === 7) {
            this.processResource.getProcessPage({ status: Status.OFFER }, { properties: "offer.timestamp", size: 10, page: 0, direction: this.direction, searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
                self.updateArray(self.openOffers, result.content, WorkflowType.OFFER);
            });
        } else if (type === "done" && self.doneOffers.length === 7) {
            this.processResource.getProcessPage({ status: Status.DONE }, { properties: "offer.timestamp", size: 10, page: 0, direction: this.direction, searchText: this.searchText, userId: this.showMyTaskUserId }).$promise.then(function (result) {
                self.updateArray(self.doneOffers, result.content, WorkflowType.OFFER);
            });
        }
    }

    updateArray(local: Array<Process>, server: Array<Process>, workflowType: WorkflowType) {
        let removedProcesses: Array<Process> = deepCopy(local);
        let indexOfData = 0;
        for (let serverProcess of server) {
            indexOfData++;
            let localProcess: Process = findElementById(local, serverProcess.id);
            if (localProcess == null) {
                local.push(serverProcess);
            } else {
                this.sliceElementFromArray(removedProcesses, findElementById(removedProcesses, localProcess.id));
                if (localProcess.lastEdited !== serverProcess.lastEdited || localProcess[workflowType.toString().toLowerCase()].customer.lastEdited !== serverProcess[workflowType.toString().toLowerCase()].customer.lastEdited) {
                    this.updateElementInArray(local, localProcess, serverProcess);
                }
            }
            if (server.length === indexOfData) {
                for (let i = 0; i < removedProcesses.length; i++) {
                    this.sliceElementFromArray(local, findElementById(local, removedProcesses[i].id));
                }
                this.orderProcessByTimestamp(local, workflowType.toString().toLowerCase(), this.direction);
            }
        }
    }

    startOfferTransformation(process: Process): Promise<Process> {
        let defer = this.q.defer();
        this.workflowService.startOfferTransformation(process).then(function (result: Process) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    }

    startSaleTransformation(process: Process): Promise<Process> {
        let defer = this.q.defer();
        this.workflowService.startSaleTransformation(process).then(function (result) {
            defer.resolve(result);
        }, function () {
            defer.reject(undefined);
        });
        return defer.promise;
    }

    async inContact(process: Process): Promise<Process> {
        return await this.workflowService.inContact(deepCopy(process));
    }

    async doneOffer(process: Process): Promise<Process> {
        return await this.workflowService.doneOffer(deepCopy(process));
    }

    closeProcess(process: Process, source: any) {
        let self = this;
        this.processResource.setStatus({
            id: process.id
        }, "CLOSED").$promise.then(function (result: Process) {
            let message = "";
            if (source === self.openLeads) {
                let leadOrderpositionValue = self.workflowService.sumOrderPositions(result.lead.orderPositions);
                self.openLeadsValue -= leadOrderpositionValue;
                self.rootScope.leadsCount -= 1;
                self.updateDashboard("lead");
                message = self.translate.instant("COMMON_TOAST_SUCCESS_CLOSE_LEAD");
            }
            else if (source === self.inContacts) {
                let leadOrderpositionValue = self.workflowService.sumOrderPositions(result.lead.orderPositions);
                self.rootScope.leadsCount -= 1;
                self.updateDashboard("incontact");
                self.inContactsValue -= leadOrderpositionValue;
                message = self.translate.instant("COMMON_TOAST_SUCCESS_CLOSE_LEAD");
            }
            else if (source === self.openOffers) {
                self.rootScope.offersCount -= 1;
                self.updateDashboard("offer");
                self.openOffersValue -= result.offer.netPrice;
                message = self.translate.instant("COMMON_TOAST_SUCCESS_CLOSE_OFFER");
            }
            else if (source === self.doneOffers) {
                self.rootScope.offersCount -= 1;
                self.updateDashboard("done");
                self.doneOffersValue -= result.offer.netPrice;
                message = self.translate.instant("COMMON_TOAST_SUCCESS_CLOSE_OFFER");
            }
            self.toaster.pop("success", "", message);
            process.status = "CLOSED";
        });
    }

    getOpenLeads(): Array<Process> {
        return this.openLeads;
    }
    getInContacts(): Array<Process> {
        return this.inContacts;
    }
    getOpenOffers(): Array<Process> {
        return this.openOffers;
    }
    getDoneOffers(): Array<Process> {
        return this.doneOffers;
    }

    getClosedSales(): Array<Process> {
        return this.closedSales;
    }

    filterMytasks(showMytasks: boolean) {
        let self = this;
        if (showMytasks) {
            this.showMyTaskUserId = this.rootScope.user.id;

        } else {
            this.showMyTaskUserId = 0;
        }
        this.initDashboard(true, false);
    }

    filterBySearch(searchText: string, showMyTasks: boolean) {
        let self = this;
        if (!stringIsNullorEmpty(searchText)) {
            this.searchText = searchText;
        } else {
            this.searchText = null;
        }
        this.initDashboard(true, false);
    }

    refreshTodos(): void {
        if (isNullOrUndefined(this.rootScope.user)) {
            return;
        }
        this.processResource.getTodos({ processorId: this.rootScope.user.id }).$promise.then((data) => {
            this.todos = data;
            this.todos.content = this.orderByTimestamp(data.content);
            this.rootScope.$broadcast("todosChanged", this.todos);
        }, (error) => handleError(error));

    }

    orderByTimestamp(todos: Array<Process>): Array<Process> {
        return todos.sort((a, b) => {
            let tempA = isNullOrUndefined(a.offer) ? moment(a.lead.timestamp, "DD.MM.YYYY HH:mm:ss") : moment(a.offer.timestamp, "DD.MM.YYYY HH:mm:ss");
            let tempB = isNullOrUndefined(b.offer) ? moment(b.lead.timestamp, "DD.MM.YYYY HH:mm:ss") : moment(b.offer.timestamp, "DD.MM.YYYY HH:mm:ss");
            if (tempA < tempB) { return -1; }
            else if (tempA > tempB) { return 1; }
            else { return 0; }
        });
    }

    orderProcessByTimestamp(process: Array<Process>, type: string, order: string): Array<Process> {
        let tempArray: Array<Process>;
        if (type === "lead") {
            tempArray = process.sort((a, b) => {
                let tempA = moment(a.lead.timestamp, "DD.MM.YYYY HH:mm:ss");
                let tempB = moment(b.lead.timestamp, "DD.MM.YYYY HH:mm:ss");
                if (tempA < tempB) { return -1; }
                else if (tempA > tempB) { return 1; }
                else { return 0; }
            });
        } else if (type === "offer") {
            tempArray = process.sort((a, b) => {
                let tempA = moment(a.offer.timestamp, "DD.MM.YYYY HH:mm:ss");
                let tempB = moment(b.offer.timestamp, "DD.MM.YYYY HH:mm:ss");
                if (tempA < tempB) { return -1; }
                else if (tempA > tempB) { return 1; }
                else { return 0; }
            });
        } else if (type === "sale") {
            tempArray = process.sort((a, b) => {
                let tempA = moment(a.sale.timestamp, "DD.MM.YYYY HH:mm:ss");
                let tempB = moment(b.sale.timestamp, "DD.MM.YYYY HH:mm:ss");
                if (tempA < tempB) { return -1; }
                else if (tempA > tempB) { return 1; }
                else { return 0; }
            });
        }
        if (order === "DESC") {
            return tempArray.reverse();
        }
        else if (order === "ASC") {
            return tempArray;
        }
    }
}
angular.module(moduleDashboardService, [ngResourceId]).service(DashboardServiceId, DashboardService);