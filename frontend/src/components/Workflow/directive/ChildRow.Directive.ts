

const ChildrowDirectiveId: string = "childrow";

class ChildrowDirective {

    templateUrl = () => { return "components/Workflow/view/ChildRow.html"; };
    transclude = false;
    restrict = "A";

    constructor(private $http, private FileSaver) { }

    static directiveFactory(): ChildrowDirective {
        let directive: any = ($http, FileSaver) => new ChildrowDirective($http, FileSaver);
        directive.$inject = [$httpId, FileSaverId];
        return directive;
    }

    link(scope, element, attrs) {
        scope.getTimestamp = function (timestamp, pattern) {
            return toLocalDate(timestamp, pattern);
        };
        scope.openAttachment = (fileUpload) => this.openAttachment(fileUpload);
    }

    async openAttachment(fileUpload: FileUpload): Promise<void> {
        let self = this;
        if (!isNullOrUndefined(fileUpload.content)) {
            let file = b64toBlob(fileUpload.content, fileUpload.mimeType);
            this.FileSaver.saveAs(file, fileUpload.filename);
            return;
        }
        let response = await this.$http.get("/api/rest/files/open/content/" + fileUpload.id, { method: "GET", responseType: "arraybuffer" });
        let contentType = response.headers("content-type");
        let file = new Blob([response.data], { type: contentType });
        this.FileSaver.saveAs(file, fileUpload.filename);

    }
}

angular.module(moduleApp).directive(ChildrowDirectiveId, ChildrowDirective.directiveFactory());

