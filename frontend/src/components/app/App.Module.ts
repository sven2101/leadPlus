/// <reference path="../app/App.Constants.ts" />
/// <reference path="../../typeDefinitions/angular.d.ts" />
/// <reference path="../../typeDefinitions/jasmine.d.ts" />
/// <reference path="../../typeDefinitions/angular-mock.d.ts" />
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

angular.module("app",
    [
        moduleApp,
        moduleAppController,
        moduleProcessResource,
        moduleAuthService,
        moduleDashboard,
        moduleLogin,
        moduleLoginService,
        moduleSignup,
        moduleSignupService,
        moduleSignupResource,
        moduleLead,
        moduleLeadResource,
        moduleOffer,
        moduleOfferResource,
        moduleSale,
        moduleSaleResource,
        moduleCommentResource,
        moduleUserResource,
        moduleStatistic,
        moduleStatisticService,
        moduleStatisticResource,
        moduleSetting,
        moduleSettingResource,
        moduleSettingService,
        moduleProfile,
        moduleProfileService,
        moduleProduct,
        moduleProductService,
        moduleProductResource,
        moduleCustomer,
        moduleCustomerService,
        moduleCustomerResource,
        moduleWorkflowService,
        moduleFileResource,

        moduleTranslate,
        moduleNgResource,
        moduleNgRoute,
        moduleNgAnimate,
        moduleNgCookies,
        moduleDatatables,
        moduleDatatablesBootstrap,
        moduleDatatablesButtons,
        moduleUiSortable,
        moduleNgSwitchery,
        moduleToaster,
        moduleHighchartsNg,


    ]);

