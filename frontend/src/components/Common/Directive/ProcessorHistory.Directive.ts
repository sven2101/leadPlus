/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Common/service/Workflow.Service.ts" />
/// <reference path="./Directive.Interface.ts" />
/// <reference path="../../../typeDefinitions/angular.d.ts" />

const ProcessorHistoryDirectiveId: string = "prosessorhistory";

class ProcessorHistoryDirective implements IDirective {

    templateUrl = () => { return "components/Common/view/Workflow.ProcessorHistory.html"; };
    transclude = false;
    restrict = "A";
    scope = {
        form: "=",
        process: "=",
    };

    constructor(private WorkflowService: WorkflowService, private $rootScope) { }

    static directiveFactory(): ProcessorHistoryDirective {
        let directive: any = (WorkflowService: WorkflowService, $rootScope) => new ProcessorHistoryDirective(WorkflowService, $rootScope);
        directive.$inject = [WorkflowServiceId, $rootScopeId];
        return directive;
    }

    link(scope, element, attrs, ctrl, transclude): void {
        scope.workflowService = this.WorkflowService;
        scope.currentSelectedActivity = "-1";
        scope.currentSelectedFomerProcessorId = this.$rootScope.user.id + "";
        scope.currentSelectedFomerProcessor = this.$rootScope.user;
        scope.addFormerProcessor = this.addFormerProcessor;
        scope.setUserById = (id) => {
            scope.currentSelectedFomerProcessor = this.getUserById(id);
        };
        scope.deletFormerProcessor = (process: Process, index: number) => process.formerProcessors.splice(index, 1);
        scope.checkForDups = (formerProcessors: Array<Processor>, user: User, activity: Activity) => scope.existsDups = this.checkForDups(formerProcessors, user, activity);
        scope.toLocalDate = this.toLocalDate;

    };

    addFormerProcessor(process: Process, user: User, activity: Activity): void {
        if (isNullOrUndefined(process.formerProcessors)) {
            process.formerProcessors = [];
        }
        process.formerProcessors.push(new Processor(user, activity));
    }
    getUserById(userId: number): User {
        return this.WorkflowService.users.filter(user => user.id === Number(userId))[0];
    }
    checkForDups(formerProcessors: Array<Processor>, user: User, activity: Activity): boolean {
        if (isNullOrUndefined(formerProcessors)) {
            return false;
        }
        return formerProcessors.filter(fp => fp.user.id === user.id && fp.activity === activity).length > 0;
    }

    toLocalDate(timestamp: any): any {
        if (timestamp === undefined) {
            timestamp = newTimestamp();
        }
        console.log(timestamp);
        return toLocalDate(timestamp);
    }
}

angular.module(moduleApp).directive(ProcessorHistoryDirectiveId, ProcessorHistoryDirective.directiveFactory());

