const TemplateDeleteControllerId: string = "TemplateDeleteController";

class TemplateDeleteController {
    private $inject = [TemplateServiceId, $uibModalId, "template"];

    templateService: TemplateService;
    uibModalInstance: any;
    template: Template;

    constructor(TemplateService, $uibModalInstance, template) {
        this.templateService = TemplateService;
        this.uibModalInstance = $uibModalInstance;
        this.template = template;
    }

    remove() {
        this.templateService.remove(this.template);
        this.close();
    }

    close() {
        this.uibModalInstance.close();
    }

}
angular.module(moduleDeleteTemplate, [ngResourceId]).controller(TemplateDeleteControllerId, TemplateDeleteController);