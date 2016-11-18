/// <reference path="../../app/App.Constants.ts" />
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

    constructor(private WorkflowService: WorkflowService, private $rootScope, private TemplateService: TemplateService, private $sce) { }

    static directiveFactory(): EditEmailDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope, TemplateService: TemplateService, $sce) => new EditEmailDirective(WorkflowService, $rootScope, TemplateService, $sce);
        directive.$inject = [WorkflowServiceId, $rootScopeId, TemplateServiceId, $sceId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        if (isNullOrUndefined(scope.process)) {
            return;
        }
        let l = $(".ladda-button").ladda();
        let button = $(".ladda-button");
        button.click(function () {
            l.ladda("start");
        });
        scope.templateId = "-1";
        scope.TemplateService = this.TemplateService;
        scope.$sce = this.$sce;
        if (isNullOrUndefined(scope.notification) && !isNullOrUndefined(scope.process.offer)) {
            scope.notification = new Notification();
            scope.notification.recipient = scope.process.offer.customer.email;
        }
        this.TemplateService.getAll().then((templates) => scope.templates = templates);
        scope.generate = (templateId, offer, currentNotification) => {
            if (Number(templateId) === -1) {
                scope.notification = new Notification();
                scope.notification.recipient = scope.process.offer.customer.email;
                return;
            }
            scope.TemplateService.generate(templateId, offer, currentNotification).then((notification) => scope.notification = notification);
        };
        scope.getAsHtml = this.getAsHtml;
        // scope.getAsHtml = function (html: string) { console.log("test", html); return scope.$sce.trustAsHtml(html); };





    };
    getAsHtml() {
        return "test";
    }

}

angular.module(moduleApp).directive(EditEmailDirectiveId, EditEmailDirective.directiveFactory());




















