/// <reference path="../../app/App.Constants.ts" />

declare var Ladda;


const EditEmailDirectiveId: string = "email";

class EditEmailDirective implements IDirective {

    templateUrl = () => { return "components/Common/view/Workflow.Edit.Email.html"; };
    transclude = false;
    restrict = "A";

    scope = {
        form: "=",
        process: "=",
        disabled: "@"
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope) { }

    static directiveFactory(): EditEmailDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope) => new EditEmailDirective(WorkflowService, $rootScope);
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        let l = $(".ladda-button").ladda();
        let button = $(".ladda-button");
        button.click(function () {
            l.ladda("start");
        });
        scope.templateId = "-1";
        scope.notificationId = "-1";
        scope.process.currentNotification = new Notification();
        scope.setFormerNotification = this.setFormerNotification;
    };

    setFormerNotification(process, notificationId: number) {
        if (Number(notificationId) === -1) {
            process.currentNotification = new Notification();
        }
        let notification: Notification = findElementById(process.notifications, Number(notificationId)) as Notification;
        if (!isNullOrUndefined(notification)) {
            process = deepCopy(notification);
            process.id = null;
        }
    }
}

angular.module(moduleApp).directive(EditEmailDirectiveId, EditEmailDirective.directiveFactory());




















