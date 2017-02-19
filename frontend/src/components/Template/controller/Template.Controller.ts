/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />
/// <reference path="../../Template/model/Template.Model.ts" />
/// <reference path="../../Notification/model/NotificationType.ts" />
/// <reference path="../../Setting/controller/Setting.Source.Service.ts" />
/// <reference path="../../Common/service/SummernoteService.ts" />

const TemplateControllerId: string = "TemplateController";

class TemplateController {


    private $inject = [TemplateServiceId, $uibModalId, "template"];


    uibModalInstance;
    templateService: TemplateService;
    template: Template;
    currentSelectedNotificationTypes: Array<string> = [];
    currentSelectedSource: Array<string> = [];
    availableNotificationTypes: Array<string> = (<any>NotificationType).getAll();
    availablesourceNames = [];
    summernoteOptions: any;
    constructor(TemplateService, $uibModalInstance, template, private SummernoteService: SummernoteService, private SourceService: SourceService, private $translate, private toaster) {
        this.templateService = TemplateService;
        this.uibModalInstance = $uibModalInstance;
        this.template = template;
        this.currentSelectedNotificationTypes = this.template.notificationTypeString == null ? [] : this.template.notificationTypeString.split(",");
        this.currentSelectedSource = this.template.sourceString == null ? [] : this.template.sourceString.split(",");
        this.SetAvailablesourceNames();
        this.summernoteOptions = SummernoteService.getTemplateOptions();
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
        this.close();
    }

    remove() {
        this.templateService.remove(this.template);
        this.close();
    }

    close() {
        this.SummernoteService.resetSummernoteConfiguration();
        this.uibModalInstance.close();
    }

    async testSyntax(): Promise<void> {
        try {
            await this.templateService.testTemplate(this.template, new WorkflowTemplateObject(), new Notification());
            this.toaster.pop("success", "", this.$translate.instant("EMAIL_TEMPLATE_SYNTAX_SUCCESS"));

        } catch (error) {
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