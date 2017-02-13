/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Setting/controller/Setting.Service.ts" />
/// <reference path="../../Smtp/controller/Smtp.Service.ts" />
/// <reference path="../../User/model/User.Model.ts" />
/// <reference path="../../Setting/model/Setting.Model.ts" />
/// <reference path="../../Template/model/Template.Model.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />

const SettingControllerId: string = "SettingController";

class SettingController {

    private $inject = [SettingServiceId, SmtpServiceId, TemplateServiceId, $rootScopeId, $translateId];

    createTemplateForm;

    currentTab: number = 1;

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
    currentUser: User;

    constructor(SettingService, SmtpService, TemplateService, $rootScope, $translate) {
        this.smtp = new Smtp();
        this.template = new Template();

        this.settingService = SettingService;
        this.templateService = TemplateService;
        this.smtpService = SmtpService;
        this.rootScope = $rootScope;
        this.translate = $translate;
        this.currentUser = this.rootScope.user;
        this.settingService.loadUsers();
    }

    tabOnClick(tab: number) {
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

    openEmailTemplateModal() {
        this.templateService.openEmailTemplateModal(new Template());
    }

    openEditEmailTemplateModal(template: Template) {
        this.templateService.openEmailTemplateModal(template);
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

