/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Setting/controller/Setting.Service.ts" />
/// <reference path="../../Smtp/controller/Smtp.Service.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../Setting/model/Setting.Model.ts" />
/// <reference path="../../Template/model/Template.Model.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />

const SettingControllerId: string = "SettingController";

class SettingController {

    private $inject = [SettingServiceId, SmtpServiceId, TemplateServiceId, $rootScopeId, $translateId, $routeId, $scopeId, $locationId];

    createTemplateForm;

    currentTab: string;

    settingService: SettingService;
    smtpService: SmtpService;
    templateService: TemplateService;

    roleSelection = Array<any>();

    smtp: Smtp;
    setting: Setting;
    template: Template;
    smtpForm;

    rootScope;
    translate;
    scope;
    location;
    route;
    currentUser: User;
    lastRoute;

    constructor(SettingService, SmtpService, TemplateService, private SummernoteService: SummernoteService, $rootScope, $translate, $route, $scope, $location) {
        this.smtp = new Smtp();
        this.template = new Template();
        this.settingService = SettingService;
        this.templateService = TemplateService;
        this.smtpService = SmtpService;
        this.rootScope = $rootScope;
        this.scope = $scope;
        this.route = $route;
        this.location = $location;
        this.translate = $translate;
        this.currentUser = this.rootScope.user;
        this.settingService.loadUsers();
        this.internalRouting($route);
    }

    internalRouting(route: any) {
        let paramTab = route.current.params.tab;
        if (!isNullOrUndefined(paramTab)) {
            this.currentTab = paramTab;
        } else {
            this.tabOnClick("users");
            route.updateParams({
                tab: this.currentTab
            });
        }
        let self = this;
        self.lastRoute = route.current;
        self.scope.$on("$locationChangeSuccess", function (event) {
            if (self.lastRoute.$$route && route.current.$$route && self.lastRoute.$$route.originalPath === route.current.$$route.originalPath) {
                if (route.current.params && isNullOrUndefined(route.current.params.tab)) {
                    route.updateParams({
                        tab: self.currentTab
                    });
                }
                route.current = self.lastRoute;
            }
        });
    }

    showTemplate(id: number) {
        if (id === 0) {
            this.location.path("settings/template/details/new");
        } else {
            this.location.path("settings/template/details/" + id);
        }
    }

    tabOnClick(tab: string) {
        this.lastRoute = this.route.current;
        this.currentTab = tab;
    }

    activateUser(user: User) {
        this.settingService.activateUser(user);
    }

    deactivateUser(user: User) {
        this.settingService.deactivateUser(user);
    }

    hasRight(user: User): boolean {
        return this.settingService.hasRight(user);
    }

    changeRole(user: User) {
        this.settingService.changeRole(user);
    }

    openEmailTemplateDeleteModal(template: Template) {
        this.templateService.openEmailTemplateDeleteModal(template);
    }

    translateStringArray(str: string, from: string): string {
        let returnString = "";
        if (!isNullOrUndefined(str)) {
            let array: Array<String> = str.split(",");
            for (let entry of array) {
                if (entry === "ALL" && from === "SOURCE") {
                    returnString += this.translate.instant("SETTING_TEMPLATE_ALL_SOURCES") + ", ";
                    continue;
                } else if (entry === "NONE" && from === "SOURCE") {
                    returnString += this.translate.instant("SETTING_TEMPLATE_NO_SOURCES") + ", ";
                    continue;
                }
                returnString += this.translate.instant(entry) + ", ";
            }
        }
        if (returnString.length > 1) {
            returnString = returnString.slice(0, -2);
        }
        return returnString;
    }
}
angular.module(moduleSetting, [ngResourceId]).controller(SettingControllerId, SettingController);

