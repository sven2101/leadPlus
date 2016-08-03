/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

"use strict";

class DashboardController {

    $inject = ["toaster", "Processes", "Comments", "$filter", "$translate", "$rootScope", "$scope", "$interval", "Profile", "StatisticResource"];

    toaster;
    filter;
    orderBy;
    translate;
    rootScope;
    procesService;
    commentService;
    profileService;
    statisticResource;
    commentModalInput;
    comments;
    infoData;
    infoType;
    infoProcess;
    infoComments;

    leadsAmount;
    offersAmount;
    salesAmount;
    profit;
    turnover;
    conversionRate;

    openLead;
    openOffer;
    sales;
    user;

    sortableOptions;

    constructor(toaster, Processes, Comments, $filter, $translate, $rootScope, $scope, $interval, Profile, StatisticResource) {
        this.toaster = toaster;
        this.filter = $filter;
        this.orderBy = $filter("orderBy");
        this.translate = $translate;
        this.rootScope = $rootScope;
        this.procesService = Processes;
        this.commentService = Comments;
        this.profileService = Profile;
        this.statisticResource = StatisticResource;
        this.commentModalInput = "";
        this.comments = {};
        this.infoData = {};
        this.infoType = "";
        this.infoProcess = {};
        this.infoComments = [];

        this.leadsAmount = {};
        this.offersAmount = {};
        this.salesAmount = {};
        this.profit = {};
        this.turnover = {};
        this.conversionRate = {};
        this.user = {};
        this.sortableOptions = {};

        this.registerPromise();
        this.getUser();
        this.setSortableOptions();
    }

    registerPromise() {
        let self = this;
        this.procesService.getLeadsByStatus({ workflow: "LEAD", status: "OPEN" }).$promise.then(function(result) {
            self.openLead = self.orderBy(result, "lead.timestamp", false);
        });
        this.procesService.getOffersByStatus({ workflow: "OFFER", status: "OFFER" }).$promise.then(function(result) {
            self.openOffer = self.orderBy(result, "offer.timestamp", false);
        });
        this.procesService.getLatestSales().$promise.then(function(result) {
            self.sales = result;
        });
        this.statisticResource.weekLeads().$promise.then(function(result) {
            self.getLeads(result);
            self.statisticResource.weekSales().$promise.then(function(result) {
                self.getSales(result);
            });
        });
        this.statisticResource.weekOffers().$promise.then(function(result) {
            self.getOffers(result);
        });
        this.statisticResource.weekProfit().$promise.then(function(result) {
            self.getProfit(result);
        });
        this.statisticResource.weekTurnover().$promise.then(function(result) {
            self.getTurnover(result);
        });
    }

    getUser() {
        let self = this;
        if (!angular.isUndefined(self.rootScope.globals.currentUser))
            self.profileService.get({ id: self.rootScope.globals.currentUser.id }).$promise.then(function(result) {
                self.user = result;
            });
    }

    setSortableOptions() {
        let self = this;
        this.sortableOptions = {
            update: function(e, ui) {
                let target = ui.item.sortable.droptargetModel;
                let source = ui.item.sortable.sourceModel;
                if ((this.openLead === target && this.openOffer === source) ||
                    (this.openLead === source && this.sales === target) ||
                    target === source) {
                    ui.item.sortable.cancel();
                }
            },
            stop: function(e, ui) {
                let target = ui.item.sortable.droptargetModel;
                let source = ui.item.sortable.sourceModel;
                let item = ui.item.sortable.model;
                if (this.sales === target && this.openOffer === source) {
                    this.addOfferToSale(item);
                }
                else if (this.openOffer === target && this.openLead === source) {
                    this.addLeadToOffer(item);
                }
            },
            connectWith: ".connectList",
            items: "li:not(.not-sortable)"
        };
    }
    addLeadToOffer(process) {
        let self = this;
        let offer = {
            container: {
                name: process.lead.container.name,
                description: process.lead.container.description,
                priceNetto: process.lead.container.priceNetto
            },
            containerAmount: process.lead.containerAmount,
            deliveryAddress: process.lead.destination,
            offerPrice: (process.lead.containerAmount * process.lead.container.priceNetto),
            prospect: {
                company: process.lead.inquirer.company,
                email: process.lead.inquirer.email,
                firstname: process.lead.inquirer.firstname,
                lastname: process.lead.inquirer.lastname,
                phone: process.lead.inquirer.phone,
                title: process.lead.inquirer.title
            },
            timestamp: this.filter("date")(new Date(), "dd.MM.yyyy HH:mm"),
            vendor: process.lead.vendor
        };
        this.procesService.addOffer({ id: process.id }, offer).$promise.then(function() {
            self.procesService.setStatus({ id: process.id }, "offer").$promise.then(function() {
                self.toaster.pop("success", "", self.translate.instant("COMMON_TOAST_SUCCESS_NEW_OFFER"));
                self.rootScope.leadsCount -= 1;
                self.rootScope.offersCount += 1;
                self.procesService.setProcessor({ id: process.id }, self.user.username).$promise.then(function() {
                    process.processor = self.user;
                });
                process.offer = offer;
                self.openOffer = self.orderBy(self.openOffer, "offer.timestamp", false);
            });
        });
    }
    addOfferToSale(process) {
        let self = this;
        let sale = {
            container: {
                name: process.offer.container.name,
                description: process.offer.container.description,
                priceNetto: process.offer.container.priceNetto
            },
            containerAmount: process.offer.containerAmount,
            transport: process.offer.deliveryAddress,
            customer: {
                company: process.offer.prospect.company,
                email: process.offer.prospect.email,
                firstname: process.offer.prospect.firstname,
                lastname: process.offer.prospect.lastname,
                phone: process.offer.prospect.phone,
                title: process.offer.prospect.title
            },
            saleProfit: 0,
            saleReturn: process.offer.offerPrice,
            timestamp: this.filter("date")(new Date(), "dd.MM.yyyy HH:mm"),
            vendor: process.offer.vendor
        };
        this.procesService.addSale({ id: process.id }, sale).$promise.then(function() {
            self.procesService.setStatus({ id: process.id }, "sale").$promise.then(function() {
                self.toaster.pop("success", "", self.translate.instant("COMMON_TOAST_SUCCESS_NEW_SALE"));
                self.rootScope.offersCount -= 1;
                process.sale = sale;
                self.sales = self.orderBy(self.sales, "sale.timestamp", true);
            });
        });
    }

    saveDataToModal(info, type, process) {
        this.infoData = info;
        this.infoType = type;
        this.infoProcess = process;
        let self = this;
        this.commentService.getComments({ id: process.id }).$promise.then(function(result) {
            self.infoComments = [];
            for (let comment in result) {
                if (comment === "$promise")
                    break;
                self.infoComments.push({
                    commentText: result[comment].commentText,
                    timestamp: result[comment].timestamp,
                    creator: result[comment].creator
                });
            }
        });
    }
    refreshData() {
        let self = this;
        this.procesService.getLeadsByStatus({ workflow: "LEAD", status: "OPEN" }).$promise.then(function(result) {
            self.openLead = self.orderBy(result, "lead.timestamp", false);
        });
        this.procesService.getOffersByStatus({ workflow: "OFFER", status: "OFFER" }).$promise.then(function(result) {
            self.openOffer = self.orderBy(result, "offer.timestamp", false);
        });
        this.procesService.getLatestSales().$promise.then(function(result) {
            self.sales = result;
        });
    }
    addComment(process) {
        let self = this;
        if (angular.isUndefined(this.infoComments)) {
            this.infoComments = [];
        }
        if (this.commentModalInput !== "" && !angular.isUndefined(this.commentModalInput)) {
            let comment = {
                process: process,
                creator: this.user,
                commentText: this.commentModalInput,
                timestamp: this.filter("date")(new Date(), "dd.MM.yyyy HH:mm:ss")
            };
            this.commentService.addComment(comment).$promise.then(function() {
                self.infoComments.push(comment);
                self.commentModalInput = "";
            });
        }
    }

    getProfit(profits) {
        let summe = 0;
        for (let profit in profits.result) {
            summe = summe + profits.result[profit];
        }
        this.profit = summe;
    }

    getTurnover(turnovers) {
        let summe = 0;
        for (let turnover in turnovers.result) {
            summe = summe + turnovers.result[turnover];
        }
        this.turnover = summe;
    }
    getLeads(leads) {
        let summe = 0;
        for (let lead in leads.result) {
            summe += leads.result[lead];
        }
        this.leadsAmount = summe;
    }
    getOffers(offers) {
        let summe = 0;
        for (let offer in offers.result) {
            summe += offers.result[offer];
        }
        this.offersAmount = summe;
    }
    getSales(sales) {
        let summe = 0;
        for (let sale in sales.result) {
            summe += sales.result[sale];
        }
        this.salesAmount = summe;
        this.getConversionrate();
    }
    getConversionrate() {
        if (this.leadsAmount !== 0) {
            this.conversionRate = (this.salesAmount / this.leadsAmount) * 100;
        }
        else
            this.conversionRate = 0;
    }
}

angular.module("app.dashboard", ["ngResource"]).controller("DashboardController", DashboardController);