/// <reference path="../../App/App.Constants.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />
/// <reference path="../../App/App.Common.ts" />

declare var Ladda;

const EditEmailDirectiveId: string = "emailEdit";

class EditEmailDirective implements IDirective {

    templateUrl = () => { return "components/Wizard/view/Edit.Email.html"; };
    transclude = false;
    restrict = "E";

    scope = {
        form: "=",
        process: "=",
        disabled: "<",
        notification: "="
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope, private TemplateService: TemplateService, private SummernoteService: SummernoteService,
        private $sce, private $http, private $window, private $translate, private toaster) { }

    static directiveFactory(): EditEmailDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope, TemplateService: TemplateService, SummernoteService: SummernoteService, $sce, $http, $window, $translate, toaster) =>
            new EditEmailDirective(WorkflowService, $rootScope, TemplateService, SummernoteService, $sce, $http, $window, $translate, toaster);
        directive.$inject = [WorkflowServiceId, $rootScopeId, TemplateServiceId, SummernoteServiceId, $sceId, $httpId, $windowId, $translateId, toasterId];
        return directive;
    }

    async link(scope, element, attrs, ctrl, transclude): Promise<void> {
        scope.$sce = this.$sce;
        scope.$window = this.$window;
        scope.$http = this.$http;
        scope.htmlString = "";
        scope.onNotificationSelected = () => this.onNotificationSelected(scope);
        scope.openAttachment = (fileUpload: FileUpload) => this.openAttachment(fileUpload, scope);
        scope.showCC_BCC = scope.disabled;
        scope.currentTemplate = null;
        if (!isNullOrUndefined(scope.form)) {
            scope.form instanceof WizardButtonConfig ? scope.form.setForm(scope.eform) : scope.eform = scope.form;
        }

        if (scope.disabled) {
            return;
        }
        scope.sizeInvalid = false;
        scope.TemplateService = this.TemplateService;
        scope.summernoteOptions = this.SummernoteService.getDefaultOptions();
        scope.workflow = scope.process.offer == null ? scope.process.lead : scope.process.offer;
        scope.workflow = scope.process.sale != null ? scope.process.sale : scope.workflow;
        scope.notification.recipient = scope.workflow.customer.email;
        scope.generate = (template, workflow, currentNotification) => this.generateContent(template, workflow, currentNotification, scope);
        scope.setAttachments = (files) => this.setAttachments(files, scope.notification, scope);
        scope.deleteAttachment = (index) => this.deleteAttachment(index, scope);

        scope.templates = await this.TemplateService.getAll();
        this.setDefaultTemplate(scope);
    };

    setAttachments(files, notification: Notification, scope): void {
        if (isNullOrUndefined(notification.attachments)) {
            notification.attachments = [];
        }
        let self = this;
        for (let file of files) {
            let attachment = new Attachment();
            let fileUpload = new FileUpload();
            let fileReader = new FileReader();
            fileUpload.filename = file.name;
            fileUpload.mimeType = file.type;
            fileUpload.size = file.size;
            fileReader.readAsDataURL(file);
            fileReader.onload = function () {
                fileUpload.content = this.result.split(",")[1];
                attachment.fileUpload = fileUpload;
                notification.attachments.push(attachment);
                self.isFileSizeInvalid(notification, scope);
                scope.$apply();
            };
            fileReader.onerror = (error) => {
                handleError(error);
            };

        }

    }

    isFileSizeInvalid(notification: Notification, scope: any): void {
        if (isNullOrUndefined(notification.attachments)) {
            return;
        }
        scope.fileSize = notification.attachments.map(a => a.fileUpload.size).reduce((a, b) => a + b, 0);
    }

    openAttachment(fileUpload: FileUpload, scope: any): void {
        if (!isNullOrUndefined(fileUpload.content)) {
            let file = b64toBlob(fileUpload.content, fileUpload.mimeType);
            let fileURL = URL.createObjectURL(file);
            window.open(scope.$sce.trustAsResourceUrl(fileURL), "_blank");
            return;
        }
        scope.$http.get("/api/rest/files/content/" + fileUpload.id, { method: "GET", responseType: "arraybuffer" }).
            success(function (data, status, headers, config, statusText) {
                let contentType = headers("content-type");
                let file = new Blob([data], { type: contentType });
                let fileURL = URL.createObjectURL(file);
                window.open(scope.$sce.trustAsResourceUrl(fileURL), "_blank");
            });
    }

    async generateContent(template: Template | null, workflow: Lead | Offer, currentNotification: Notification, scope: any): Promise<void> {
        if (template == null) {
            return;
        }
        let id = isNumeric(template) ? template : template.id;
        try {
            let notification: Notification = await scope.TemplateService.generate(id, workflow, currentNotification);
            notification.subject = !isNumeric(template) ? template.subject : currentNotification.subject;
            scope.notification.content = notification.content;
            scope.notification.subject = notification.subject;
        }
        catch (error) {
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
    };

    reloadHtmlString(scope: any): void {
        if (isNullOrUndefined(scope.notification)) {
            return;
        }
        scope.htmlString = scope.$sce.trustAsHtml(scope.notification.content);
    }

    deleteAttachment(index: number, scope: any): void {
        scope.notification.attachments.splice(index, 1);
        scope.sizeInvalid = this.isFileSizeInvalid(scope.notification, scope);
    }

    onNotificationSelected(scope: any): void {
        if (isNullOrUndefined(scope.notification)) {
            scope.notification = new Notification();
        }
        this.reloadHtmlString(scope);
        scope.sizeInvalid = this.isFileSizeInvalid(scope.notification, scope);
    }

    setDefaultTemplate(scope: any): void {
        let notificationType = scope.notification.notificationType;
        let sourceName = scope.process.source == null ? "NONE" : scope.process.source.name;
        let templates: Array<Template> = scope.templates;

        for (let t of templates) {
            let containsNotificationType = t.notificationTypeString == null ? false : contains<string>(t.notificationTypeString.split(","), notificationType);
            let containsSourceName = t.sourceString == null ? false : contains<string>(t.sourceString.split(","), sourceName);
            if (containsNotificationType === true && containsSourceName === true) {
                this.setTemplate(scope, t);
                return;
            }
        }
        for (let t of templates.filter(t => t.notificationTypeString != null && contains<string>(t.notificationTypeString.split(","), "ALL"))) {
            if (contains<string>(t.sourceString.split(","), sourceName)) {
                this.setTemplate(scope, t);
                return;
            }
        }
        for (let t of templates.filter(t => t.sourceString != null && contains<string>(t.sourceString.split(","), "ALL"))) {
            if (contains<string>(t.notificationTypeString.split(","), notificationType)) {
                this.setTemplate(scope, t);
                return;
            }
        }
    }
    setTemplate(scope: any, t: Template): void {
        scope.currentTemplate = t;
        scope.notification.subject = t.subject;
        scope.generate(t, scope.workflow, scope.notification);
    }

}

angular.module(moduleApp).directive(EditEmailDirectiveId, EditEmailDirective.directiveFactory());




















