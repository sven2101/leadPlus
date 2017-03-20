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
        return this.currentEditTemplate;
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

    save(template: Template): Promise<Template> {
        let defer = this.q.defer();
        let self = this;
        this.templateResource.save(template).$promise.then(function (result: Template) {
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_SAVE"));
            self.templates.push(result);
            defer.resolve(result);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_SAVE_ERROR"));
            defer.reject(null);
        });
        return defer.promise;
    }

    update(template: Template): Promise<Template> {
        let defer = this.q.defer();
        let self = this;
        this.templateResource.update(template).$promise.then(function (result: Template) {
            self.toaster.pop("success", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_UPDATE"));
            let oldTemplate: Template = findElementById(self.templates, template.id);
            let index = self.templates.indexOf(oldTemplate);
            self.templates[index] = template;
            defer.resolve(result);
        }, function () {
            self.toaster.pop("error", "", self.translate.instant("SETTING_TOAST_EMAIL_TEMPLATE_UPDATE_ERROR"));
            defer.reject(null);
        });
        return defer.promise;
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

    async generate(templateId: number, workflow: Offer | Lead, notification: Notification): Promise<Notification> {
        return this.templateResource.generate({ templateId: templateId }, { workflowTemplateObject: workflow, notification: notification, user: this.$rootScope.user }).$promise;
    }

    async testTemplate(template: Template, workflow: Offer | Lead, notification: Notification): Promise<Notification> {
        return this.templateResource.test({ workflowTemplateObject: workflow, notification: notification, template: template, user: this.$rootScope.user }).$promise;
    }

    async generatePDF(html: string) {
        return await this.templateResource.generatePDF({ htmlString: html }).$promise;
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

