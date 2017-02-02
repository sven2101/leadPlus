/// <reference path="../../Statistic/controller/Statistic.Service.ts" />
/// <reference path="../../Setting/controller/Setting.Source.Service.ts" />
/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../App/App.Resource.ts" />
/// <reference path="../../App/App.Constants.ts" />
/// <reference path="../../Statistic/model/ColumnChart.Model.ts" />" />

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

const UserDetailControllerId: string = "UserDetailController";

class UserDetailController {

    $inject = [$routeParamsId, UserResourceId, StatisticServiceId, SourceServiceId, $scopeId, $translateId];

    statisticService: StatisticService;
    sourceService: SourceService;
    userResource;
    routeParams;
    currentUser: User;
    currentUserId: number;
    userFound: boolean = false;
    userStatisticColumnChart: ColumnChart;
    translate;
    dateRange: string;
    source: string;


    constructor($routeParams, UserResource, StatisticService, SourceService, $scope, $translate) {
        this.statisticService = StatisticService;
        this.sourceService = SourceService;
        this.userResource = UserResource.resource;
        this.dateRange = "ALL";
        this.source = "ALL";
        this.routeParams = $routeParams;
        this.currentUserId = this.routeParams.userId;
        this.translate = $translate;
        this.getUserById();
    }

    getUserById() {
        let self = this;
        this.userResource.getById({ id: this.currentUserId }).$promise.then(function (result: User) {
            self.currentUser = result;
            if (!isNullOrUndefined(self.currentUser.id)) {
                self.userStatisticColumnChart = new ColumnChart(self.translate, "SPCLOS", getNameOfUser(self.currentUser), ""
                    , self.translate.instant("DETAIL_STATISTIC_USER_TOOLTIP", { username: "{series.name}", count: "{point.y}", workflow: "{point.name}" })
                    , [self.translate.instant("LEAD_LEADS"), self.translate.instant("OFFER_OFFERS"), self.translate.instant("SALE_SALES")]);
                self.userFound = true;
            }
        });
    }

    getNameOfUser(user: User): string {
        return getNameOfUser(user);
    }
}
angular.module(moduleUserDetail, [ngResourceId]).controller(UserDetailControllerId, UserDetailController);

