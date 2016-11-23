/// <reference path="../../App/App.Constants.ts" />
/// <reference path="../../Common/service/Workflow.Service.ts" />
/// <reference path="../../Template/controller/Template.Service.ts" />

declare var Ladda;


const EditEmailDirectiveId: string = "email";

class EditEmailDirective implements IDirective {

    templateUrl = () => { return "components/Common/view/Workflow.Edit.Email.html"; };
    transclude = false;
    restrict = "A";

    scope = {
        form: "=",
        process: "=",
        disabled: "=",
        notification: "="
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope, private TemplateService: TemplateService, private $sce, private $http, private $window) { }

    static directiveFactory(): EditEmailDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope, TemplateService: TemplateService, $sce, $http, $window) =>
            new EditEmailDirective(WorkflowService, $rootScope, TemplateService, $sce, $http, $window);
        directive.$inject = [WorkflowServiceId, $rootScopeId, TemplateServiceId, $sceId, $httpId, $windowId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.$sce = this.$sce;
        scope.$window = this.$window;
        scope.$http = this.$http;
        scope.htmlString = "";
        scope.onNotificationSelected = () => this.onNotificationSelected(scope);
        scope.openAttachment = (fileUpload: FileUpload) => this.openAttachment(fileUpload, scope);
        if (scope.disabled) {
            return;
        }
        scope.sizeInvalid = false;
        let l = $(".ladda-button").ladda();
        let button = $(".ladda-button");
        button.click(function () {
            l.ladda("start");
        });
        scope.templateId = "-1";
        scope.TemplateService = this.TemplateService;
        this.TemplateService.getAll().then((templates) => scope.templates = templates);
        scope.generate = (templateId, offer, currentNotification) => this.generateContent(templateId, offer, currentNotification, scope);
        scope.setAttachments = (files) => this.setAttachments(files, scope.notification, scope);
        scope.deleteAttachment = (index) => this.deleteAttachment(index, scope);
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

    generateContent(templateId: string, offer: Offer, currentNotification: Notification, scope: any): void {
        if (Number(templateId) === -1) {
            scope.notification = new Notification();
            scope.notification.recipient = scope.process.offer.customer.email;
            return;
        }
        scope.TemplateService.generate(templateId, offer, currentNotification).then((notification: Notification) => scope.notification.content = notification.content);
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
}

angular.module(moduleApp).directive(EditEmailDirectiveId, EditEmailDirective.directiveFactory());




















