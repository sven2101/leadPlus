/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />
/// <reference path="../../Template/model/Template.Model.ts" />
/// <reference path="../../Notification/model/NotificationType.ts" />
/// <reference path="../../Setting/controller/Setting.Source.Service.ts" />
/// <reference path="../../Common/service/SummernoteService.ts" />

const TemplateControllerId: string = "TemplateController";

class TemplateController {
    private $inject = [TemplateServiceId, $routeParamsId, $locationId];

    templateService: TemplateService;
    template: Template;
    location: any;
    currentSelectedNotificationTypes: Array<string> = [];
    currentSelectedSource: Array<string> = [];
    availableNotificationTypes: Array<string> = (<any>NotificationType).getAll();
    availablesourceNames = [];
    summernoteOptions: any;
    templateFound: boolean;
    templateTested: boolean = false;
    templateHead: string;
    templateType = TemplateType;
    constructor(TemplateService, private SummernoteService: SummernoteService, private SourceService: SourceService, private $translate, private toaster, $routeParams, $location) {
        this.templateService = TemplateService;
        this.location = $location;
        this.initTemplate($routeParams);
        this.SetAvailablesourceNames();
        this.availableNotificationTypes.splice(this.availableNotificationTypes.indexOf(NotificationType.ERROR.toString()), 1);
        this.summernoteOptions = SummernoteService.getTemplateOptions(true);
        this.SummernoteService.resetSummernoteConfiguration();
    }

    async initTemplate($routeParams) {
        let templateId = $routeParams.templateId;
        if (!isNullOrUndefined(templateId) && templateId !== 0 && !isNaN(templateId) && angular.isNumber(+templateId)) {
            this.template = await this.templateService.getTemplateById(Number(templateId));
            this.templateHead = this.template.name;
            isNullOrUndefined(this.template) ? this.templateFound = false : this.templateFound = true;
        } else if (!isNullOrUndefined(templateId) && templateId === "new") {
            this.template = new Template();
            this.templateService.currentEditTemplate = this.template;
            this.template.sourceString = "NONE,ALL";
            this.templateHead = "SETTING_EMAIL_NEW_TEMPLATE";
            this.templateFound = true;
        }
        if (this.templateFound === true) {
            this.currentSelectedNotificationTypes = this.template.notificationTypeString == null ? [] : this.template.notificationTypeString.split(",");
            this.currentSelectedSource = this.template.sourceString == null ? [] : this.template.sourceString.split(",");
            if (isNullOrUndefined(this.templateService.templates)) {
                this.templateService.getAll();
            }

        }
    }

    isTemplateInPreviewMode(): boolean {
        return this.SummernoteService.isInPreviewMode();
    }

    async SetAvailablesourceNames(): Promise<void> {
        let temp = await this.SourceService.getActiveSources().map(s => s.name);
        this.availablesourceNames = this.availablesourceNames.concat(temp);
    }

    getTranslationByKey(key: string): string {
        return this.$translate.instant(key);
    }

    save() {
        if (this.currentSelectedNotificationTypes.length > 0) {
            this.template.notificationTypeString = this.currentSelectedNotificationTypes.join(",");
        } else {
            this.template.notificationTypeString = null;
        }
        if (this.currentSelectedSource.length > 0) {
            this.template.sourceString = this.currentSelectedSource.join(",");
        } else {
            this.template.sourceString = null;
        }

        if (isNullOrUndefined(this.template.id)) {
            this.templateService.save(this.template);
        } else {
            this.templateService.update(this.template);
        }

        this.template = null;
        this.goBack();
    }

    goBack() {
        this.location.path("settings/template");
        this.SummernoteService.resetSummernoteConfiguration();
    }

    async testSyntax(): Promise<void> {
        try {
            await this.templateService.testTemplate(this.template, new WorkflowTemplateObject(), new Notification());
            this.templateTested = true;
            this.toaster.pop("success", "", this.$translate.instant("EMAIL_TEMPLATE_SYNTAX_SUCCESS"));

        } catch (error) {
            this.templateTested = false;
            console.log(error);
            if (error.data != null && error.data.exception !== "dash.templatemanagement.business.TemplateCompilationException") {
                return this.toaster.pop("error", "", this.$translate.instant("EMAIL_TEMPLATE_ERROR"));
            }
            let errorMessage = error == null || error.data == null ? "" : ": " + error.data.message;
            if (error != null && error.data != null && error.data.message != null && error.data.message.substring(0, 6) !== "Syntax") {
                this.toaster.pop("error", "", this.$translate.instant("EMAIL_TEMPLATE_ERROR") + errorMessage);
                return;
            }
            errorMessage = error == null || error.data == null ? "" : ": " + error.data.message.substring(36);
            this.toaster.pop("error", "", this.$translate.instant("EMAIL_TEMPLATE_ERROR") + errorMessage);
        }

    }


}
angular.module(moduleTemplate, [ngResourceId, moduleAngularChosen]).controller(TemplateControllerId, TemplateController);