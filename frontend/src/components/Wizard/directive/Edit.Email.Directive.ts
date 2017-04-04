/// <reference path="../../App/App.Constants.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />
/// <reference path="../../Template/model/TemplateType.ts" />
/// <reference path="../../App/App.Common.ts" />

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
        private $sce, private $http, private $window, private $translate, private toaster, private $cookies, private TokenService: TokenService, private FileSaver) { }

    static directiveFactory(): EditEmailDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope, TemplateService: TemplateService,
            SummernoteService: SummernoteService, $sce, $http, $window, $translate, toaster, $cookies, TokenService, FileSaver) =>
            new EditEmailDirective(WorkflowService, $rootScope, TemplateService,
                SummernoteService, $sce, $http, $window, $translate, toaster, $cookies, TokenService, FileSaver);
        directive.$inject = [WorkflowServiceId, $rootScopeId, TemplateServiceId, SummernoteServiceId, $sceId, $httpId, $windowId, $translateId, toasterId, $cookiesId, TokenServiceId, FileSaverId];
        return directive;
    }
    static init: boolean = false;

    async link(scope, element, attrs, ctrl, transclude): Promise<void> {
        // TODO find better solution
        if (EditEmailDirective.init === false) {
            EditEmailDirective.init = true;
            return;
        }
        scope.rootScope = this.$rootScope;
        scope.$sce = this.$sce;
        scope.$window = this.$window;
        scope.translate = this.$translate;
        scope.$http = this.$http;
        scope.htmlString = "";
        scope.onNotificationSelected = () => this.onNotificationSelected(scope);
        scope.openAttachment = (fileUpload: FileUpload) => this.openAttachment(fileUpload, scope);
        scope.showCC_BCC = scope.disabled;
        scope.currentEmailTemplate = null;
        scope.currentPdfTemplate = null;
        if (!isNullOrUndefined(scope.form)) {
            scope.form instanceof WizardButtonConfig ? scope.form.setForm(scope.eform) : scope.eform = scope.form;
        }

        if (scope.disabled) {
            return;
        }
        scope.sizeInvalid = false;
        scope.TemplateService = this.TemplateService;
        scope.summernoteOptions = this.SummernoteService.getDefaultOptions(false);
        scope.TokenService = this.TokenService;
        scope.workflow = scope.process.offer == null ? scope.process.lead : scope.process.offer;
        scope.workflow = scope.process.sale != null ? scope.process.sale : scope.workflow;
        scope.notification.recipient = scope.workflow.customer.email;
        scope.generateContent = (template, workflow, currentNotification) => this.generateContent(template, workflow, currentNotification, scope);
        scope.setAttachments = (files) => this.setAttachments(files, scope.notification, scope);
        scope.deleteAttachment = (index) => this.deleteAttachment(index, scope);
        scope.toLocalDate = (timestamp) => this.toLocalDate(timestamp, scope);
        scope.generatePdf = (htmlString) => this.generatePdf(scope, htmlString);
        scope.generatePdfFromTemplate = (template) => this.generatePdfFromTemplate(scope, template, scope.workflow, scope.notification);
        this.setDefaultBCCAndCC(scope.notification);
        let templates = await this.TemplateService.getAll();
        scope.emailTemplates = templates.filter(t => t.templateTypes.indexOf(TemplateType.EMAIL) !== -1);
        scope.pdfTemplates = templates.filter(t => t.templateTypes.indexOf(TemplateType.PDF) !== -1);

        if (scope.notification.id == null) {
            this.setDefaultTemplate(scope, scope.emailTemplates, TemplateType.EMAIL);
            this.setDefaultTemplate(scope, scope.pdfTemplates, TemplateType.PDF);
        }
        EditEmailDirective.init = false;
    };

    toLocalDate(timestamp, scope) {
        return toLocalDate(timestamp, "DD.MM.YYYY HH:mm");
    }

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
                if (fileUpload.content == null) {
                    fileUpload.content = "";
                }
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

    async openAttachment(fileUpload: FileUpload, scope: any): Promise<void> {
        let self = this;
        if (!isNullOrUndefined(fileUpload.content)) {
            let file = b64toBlob(fileUpload.content, fileUpload.mimeType);
            this.FileSaver.saveAs(file, fileUpload.filename);
            return;
        }

        // await scope.TokenService.setAccessTokenCookie();
        // window.open("/api/rest/files/open/content/" + fileUpload.id, "_blank");

        let response = await this.$http.get("/api/rest/files/open/content/" + fileUpload.id, { method: "GET", responseType: "arraybuffer" });
        let contentType = response.headers("content-type");
        let file = new Blob([response.data], { type: contentType });
        this.FileSaver.saveAs(file, fileUpload.filename);

    }

    async generateContent(template: Template | null, workflow: WorkflowTemplateObject, currentNotification: Notification, scope: any): Promise<void> {
        if (template == null) {
            return;
        }
        let id = isNumeric(template) ? template : template.id;
        try {
            workflow.referencedOfferContent = this.getLastOfferNotificationContent(scope.process);
            console.log(workflow);
            let notification: Notification = await scope.TemplateService.generateNotification(id, workflow, currentNotification);
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

    getLastOfferNotificationContent(process: Process): string {
        console.log(process.notifications);
        if (process.notifications == null) { return null; }
        let notifications = process.notifications
            .filter(n => n.notificationType === NotificationType.OFFER)
            .sort((a, b) => a.timestamp - b.timestamp);
        console.log(notifications);
        if (notifications.length === 0 || notifications[0] == null) { return null; }

        return this.getFormatedReferencedNotification(notifications[0]);
    }

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

    setDefaultTemplate(scope: any, templates: Array<Template>, templateType: TemplateType): void {
        let notificationType = scope.notification.notificationType;
        let sourceName = scope.process.source == null ? "NONE" : scope.process.source.name;
        for (let t of templates) {
            let containsNotificationType = t.notificationTypeString == null ? false : contains<string>(t.notificationTypeString.split(","), notificationType);
            let containsSourceName = t.sourceString == null ? false : contains<string>(t.sourceString.split(","), sourceName);
            if (containsNotificationType === true && containsSourceName === true) {
                this.setTemplate(scope, t, templateType);
                return;
            }
        }
        for (let t of templates.filter(t => t.notificationTypeString != null && t.sourceString != null && contains<string>(t.notificationTypeString.split(","), "ALL"))) {
            if (contains<string>(t.sourceString.split(","), sourceName) || contains<string>(t.sourceString.split(","), "ALL")) {
                this.setTemplate(scope, t, templateType);
                return;
            }
        }
        for (let t of templates.filter(t => t.notificationTypeString != null && t.sourceString != null && contains<string>(t.sourceString.split(","), "ALL"))) {
            if (contains<string>(t.notificationTypeString.split(","), notificationType) || contains<string>(t.notificationTypeString.split(","), "ALL")) {
                this.setTemplate(scope, t, templateType);
                return;
            }
        }

    }
    setTemplate(scope: any, t: Template, templateType: TemplateType): void {
        if (templateType === TemplateType.EMAIL) {
            scope.currentEmailTemplate = t;
            scope.notification.subject = t.subject;
            scope.generateContent(t, scope.workflow, scope.notification);
        } else if (templateType === TemplateType.PDF) {
            scope.currentPdfTemplate = t;
            scope.generatePdfFromTemplate(t);
        }
    }

    async generatePdfFromTemplate(scope, template: Template, workflow: Lead | Offer, currentNotification: Notification): Promise<void> {
        if (scope.generatePdfFromTemplateInProgress === true) { return; }
        if (template == null || workflow == null) { return; }
        let attachment = new Attachment();
        let fileUpload = new FileUpload();
        fileUpload.filename = template.subject.replace(/ /g, "_") + ".pdf";
        attachment.fileUpload = fileUpload;
        currentNotification.attachments = currentNotification.attachments == null ? [] : currentNotification.attachments;
        currentNotification.attachments.push(attachment);
        attachment["inProgress"] = true;
        scope.generatePdfFromTemplateInProgress = true;
        try {

            let response = await this.TemplateService.generatePdfFromTemplateId(template.id, workflow);
            let file = b64toBlob(response.data, "application/pdf");
            let fileReader = new FileReader();
            fileUpload.mimeType = file.type;
            fileUpload.size = file.size;
            fileReader.onload = function () {
                fileUpload.content = this.result.split(",")[1];
                if (fileUpload.content == null) {
                    fileUpload.content = "";
                }
                attachment["inProgress"] = false;
                scope.$apply();
            };
            fileReader.readAsDataURL(file);
            fileReader.onerror = (error) => {
                handleError(error);
            };
        } catch (error) {
            attachment["hasError"] = true;
            setTimeout(function () {
                let index = currentNotification.attachments.indexOf(attachment);
                if (index !== -1) {
                    currentNotification.attachments.splice(index, 1);
                }
                scope.$apply();
            }, 3000);
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
        } finally {
            scope.generatePdfFromTemplateInProgress = false;
        }

    }

    async generatePdf(scope: any, htmlString: string): Promise<Blob> {
        let response = await scope.$http.post("/api/rest/files/generate/pdf", { htmlString: htmlString }, { method: "POST", responseType: "arraybuffer" });
        let contentType = response.headers("content-type");
        let file = new Blob([response.data], { type: contentType });
        file["name"] = "Angebot.pdf";
        return file;
    }
    setDefaultBCCAndCC(notification: Notification): void {
        notification.recipientsBCC = this.$rootScope.user.defaultBCC;
        notification.recipientsCC = this.$rootScope.user.defaultCC;
    }

    getFormatedReferencedNotification(referenceNotification: Notification): string {
        return `<table>
                    <tbody>
                        <tr>
                            <td style="width:50px"></td>
                            <td style="width:3px;height:100%; border:3px solid;border-color: #dddddd; border-radius: 25px;background-color: #dddddd"></td>
                            <td style="width:20px;"></td>
                            <td style="font-style:italic;">
                                <style> 
                                    em td {    font-style: italic !important;}
                                    em img {    font-style: italic !important;-webkit-filter: grayscale(100%); filter: grayscale(100%);}
                                </style>
                                <div>${this.$translate.instant("NOTIFICATION_SENT_ON")} ${referenceNotification.timestamp.substr(0, 16)} </div><br>
                                <em>${referenceNotification.content}</em>
                            </td>
                        </tr>
                    </tbody>
                </table>`;
    }
    removeReferenceNotification(notification: Notification): void {
        if (notification.content == null) { return; }
        let n = notification.content.indexOf("<!-- referenceNotification -->");
        notification.content = notification.content.substring(0, n !== -1 ? n : notification.content.length);
    }
}

angular.module(moduleApp).directive(EditEmailDirectiveId, EditEmailDirective.directiveFactory());




















