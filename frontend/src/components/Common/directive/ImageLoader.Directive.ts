/// <reference path="../../app/App.Constants.ts" />
/// <reference path="../../Workflow/controller/Workflow.Service.ts" />
/// <reference path="./Directive.Interface.ts" />
/// <reference path="../../../typeDefinitions/angular.d.ts" />

const ImageLoaderDirectiveId: string = "httpsrc";

class ImageLoaderDirective implements IDirective {

    templateUrl = undefined;
    transclude = false;
    restrict = "A";
    scope = {};

    constructor(private $http) { }

    static directiveFactory(): ImageLoaderDirective {
        let directive: any = ($http) => new ImageLoaderDirective($http);
        directive.$inject = [$httpId];
        return directive;
    }

    link(scope, element, attrs) {
        if (isNullOrUndefined(attrs.pictureid) || attrs.pictureid === "") {
            attrs.$set("src", "");
            return;
        }
        let requestConfig = {
            method: "Get",
            url: attrs.httpsrc + attrs.pictureid,
            responseType: "arraybuffer",
            cache: "true"
        };
        attrs.$set("src", "assets/img/placeholder_person.png");
        let self = this;
        this.$http(requestConfig)
            .success(function (data) {

                let arr = new Uint8Array(data);
                let raw = "";
                let i, j, subArray, chunk = 5000;
                for (i = 0, j = arr.length; i < j; i += chunk) {
                    subArray = arr.subarray(i, i + chunk);
                    raw += String.fromCharCode.apply(null, subArray);
                }
                let b64 = btoa(raw);
                attrs.$set("src", "data:image/jpeg;base64," + b64);
            });
    }

}

angular.module(moduleApp).directive(ImageLoaderDirectiveId, ImageLoaderDirective.directiveFactory());





