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

    openEmailTemplateModal(template: Template) {
        let editTemplate = deepCopy(template);
        this.currentEditTemplate = editTemplate;
        this.uibModal.open({
            templateUrl: "components/Template/view/Template.Modal.html",
            controller: "TemplateController",
            controllerAs: "templateCtrl",
            windowClass: "inmodal",
            size: "lg",
            backdrop: "static",
            resolve: {
                template: function () {
                    return editTemplate;
                }
            }
        });
    }

    openEmailTemplateDeleteModal(template: Template) {
        this.uibModal.open({
            templateUrl: "components/Template/view/Template.Delete.Modal.html",
            controller: "TemplateController",
            controllerAs: "templateCtrl",
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

    generatePDF(templateId: string, offer: Offer) {
        let defer = this.q.defer();
        let self = this;
        this.templateResource.generatePDF({ templateId: templateId }, offer).$promise.then(function (result) {
            let file = new Blob([result], { type: "application/pdf" });
            let fileURL = URL.createObjectURL(file);
            self.window.open(self.sce.trustAsResourceUrl(fileURL), "_blank");
            self.window.open(fileURL);
            defer.resolve(result);
        }, function (error: any) {
            defer.reject(error);
        });
        return defer.promise;
    }

    async getAll(): Promise<Array<Template>> {
        this.templates = await this.templateResource.getAll().$promise;
        return this.templates;
    }
}

angular.module(moduleTemplateService, [ngResourceId]).service(TemplateServiceId, TemplateService);

