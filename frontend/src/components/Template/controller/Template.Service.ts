/// <reference path="../../app/App.Resource.ts" />
/// <reference path="../../Template/model/Template.Model.ts" />
/// <reference path="../../Offer/model/Offer.Model.ts" />
/// <reference path="../../Notification/model/Notification.Model.ts" />
/// <reference path="../../Template/controller/Template.Controller.ts" />

const TemplateServiceId: string = "TemplateService";

class TemplateService {

    private $inject = [toasterId, $translateId, $rootScopeId, TemplateResourceId, $uibModalId, $qId, $windowId, $sceId];

    templateResource;

    translate;
    toaster;
    uibModal;
    q;
    window;
    content: any;
    templates: Array<Template>;
    currentEditTemplate: Template;
    sce;
    inconsistency: string;

    constructor(toaster, $translate, private $rootScope, TemplateResource, $uibModal, $q, $window, $sce) {
        this.toaster = toaster;
        this.translate = $translate;
        this.uibModal = $uibModal;
        this.q = $q;
        this.window = $window;
        this.templateResource = TemplateResource.resource;
        this.sce = $sce;
    }

    getCurrentEditTemplate(): Template {
        return deepCopy(this.currentEditTemplate);
    }

    getTemplateFromTemplatesById(id: number): Template {
        let editTemplate = deepCopy(findElementById(this.templates, id));
        this.currentEditTemplate = editTemplate;
        return editTemplate;
    }

    openEmailTemplateDeleteModal(template: Template) {
        this.uibModal.open({
            templateUrl: "components/Template/view/Template.Delete.Modal.html",
            controller: "TemplateDeleteController",
            controllerAs: "TemplateDeleteCtrl",
            resolve: {
                template: function () {
                    return template;
                }
            }
        });
    }

    async save(template: Template): Promise<Template> {
        try {
            let savedTemplate = await this.templateResource.save(template).$promise;
            this.inconsistency = null;
            this.templates.push(savedTemplate);
            return savedTemplate;
        } catch (error) {
            template = null;
            throw error;
        }
    }

    async update(template: Template): Promise<Template> {
        try {
            let savedTemplate = await this.templateResource.update(template).$promise;
            this.inconsistency = null;
            let oldTemplate: Template = findElementById(this.templates, template.id);
            let index = this.templates.indexOf(oldTemplate);
            this.templates[index] = savedTemplate;
            return savedTemplate;
        } catch (error) {
            template = null;
            throw error;
        }
    }

    remove(template: Template) {
        let self = this;
        let indexOfTemplate = this.templates.indexOf(template);
        this.templateResource.remove({ id: template.id }).$promise.then(function () {
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_DELETE"));
            self.templates.splice(indexOfTemplate, 1);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_DELETE_ERROR"));
        });
    }

    async generateNotification(templateId: number, workflow: WorkflowTemplateObject, notification: EmailNotification): Promise<EmailNotification> {
        return this.templateResource.generateNotification({ templateId: templateId }, { workflowTemplateObject: workflow, notification: notification, user: this.$rootScope.user }).$promise;
    }

    async testTemplate(template: Template, workflow: Offer | Lead, notification: EmailNotification): Promise<EmailNotification> {
        return this.templateResource.test({ workflowTemplateObject: workflow, notification: notification, template: template, user: this.$rootScope.user }).$promise;
    }

    async generatePDF(html: string) {
        return await this.templateResource.generatePDF({ htmlString: html }).$promise;
    }

    async exportProcessAsPDF(workflow: WorkflowTemplateObject): Promise<any> {
        return this.templateResource.exportProcessAsPDF(workflow).$promise;
    }

    async generatePdfFromTemplateId(templateId: number, workflow: Lead | Offer): Promise<any> {
        return await this.templateResource.generatePdfFromTemplate({ templateId: templateId }, { workflowTemplateObject: workflow, user: this.$rootScope.user }).$promise;
    }

    async generatePdfFromTemplate(template: Template, workflow: WorkflowTemplateObject): Promise<any> {
        let user: User = deepCopy(this.$rootScope.user);
        delete user["smtpKey"];
        return await this.templateResource.generatePdfFromTemplateObject({ template: template, workflowTemplateObject: workflow, user: user }).$promise;
    }

    async getAll(): Promise<Array<Template>> {
        this.templates = await this.templateResource.getAll().$promise;
        return this.templates;
    }

    async getTemplateById(id: number): Promise<Template> {
        let template: Template = await this.templateResource.getById({ id: id }).$promise as Template;
        if (isNullOrUndefined(template.id)) {
            return null;
        }
        this.currentEditTemplate = template;
        return template;
    }
}

angular.module(moduleTemplateService, [ngResourceId]).service(TemplateServiceId, TemplateService);

