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

angular.module(moduleApp,
    [
        moduleApp,
        moduleAppController,
        moduleProcessResource,
        moduleProcessService,
        moduleAuthService,
        moduleDashboard,
        moduleDashboardService,
        moduleLogin,
        moduleLoginService,
        moduleSignup,
        moduleSignupService,
        moduleSignupResource,
        moduleLead,
        moduleLeadResource,
        moduleLeadService,
        moduleLeadDataTableService,
        moduleOffer,
        moduleOfferResource,
        moduleOfferService,
        moduleOfferDataTableService,
        moduleSale,
        moduleSaleResource,
        moduleSaleService,
        moduleSaleDataTableService,
        moduleCommentResource,
        moduleUserResource,
        moduleUserDetail,
        moduleStatistic,
        moduleStatisticService,
        moduleStatisticResource,
        moduleSetting,
        moduleSettingResource,
        moduleSettingService,
        moduleProfile,
        moduleProfileService,
        moduleProduct,
        moduleProductDetail,
        moduleProductService,
        moduleProductResource,
        moduleCustomer,
        moduleCustomerService,
        moduleCustomerResource,
        moduleCustomerDetail,
        moduleWorkflowService,
        moduleFileResource,
        moduleFileService,
        moduleSmtpResource,
        moduleSmtpService,
        moduleTemplate,
        moduleTemplateResource,
        moduleTemplateService,
        moduleNotificationResource,
        moduleNotificationService,
        moduleTenantResource,
        moduleTenantService,
        moduleRegistration,
        moduleRegistrationService,
        moduleSubdomainService,
        moduleSource,
        moduleSourceService,
        moduleSourceResource,
        moduleTransition,

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
        moduleNgImgCrop,
        moduleUIBootstrap,
        moduleSummernote,
        moduleFootable,
        moduleSanitize,
        moduleSweetAlert
    ]);