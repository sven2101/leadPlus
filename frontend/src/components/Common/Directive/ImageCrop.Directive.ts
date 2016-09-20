/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../FileUpload/model/FileUpload.Model.ts" />

angular.module(moduleApp)
    .directive("imagecrop", function ($rootScope) {
        let directive: { restrict: string, scope: any, templateUrl: any, transclude: boolean, link: any };
        directive = { restrict: null, scope: null, templateUrl: null, transclude: null, link: null };
        directive.scope = {
            event: "@",
            parent: "=",
            defaultpicture: "="
        };
        directive.restrict = "A";
        directive.templateUrl = function (elem, attr) {
            return "components/common/view/ImageCrop.html";
        };
        directive.transclude = true;
        directive.link = function (scope, element, attrs) {
            scope.buildImageCropper = function () {
                let $image = $(".image-crop > img") as any;
                $image.cropper({
                    aspectRatio: 1,
                    preview: ".img-preview"
                });

                let $inputImage = $("#inputImage");
                if (window["FileReader"]) {
                    $inputImage.change(function () {
                        let fileReader = new FileReader(),
                            files = this.files,
                            file;

                        if (!files.length) {
                            return;
                        }

                        file = files[0];

                        if (/^image\/\w+$/.test(file.type)) {
                            fileReader.readAsDataURL(file);
                            fileReader.onload = function () {
                                $inputImage.val("");
                                $image.cropper("reset", true).cropper("replace", this.result);
                            };
                        }
                    });
                } else {
                    $inputImage.addClass("hide");
                }
            };
            scope.buildImageCropper();           

            scope.$on("saveCroppedImage", function (evt, data) {
                let $image = $(".image-crop > img") as any;
                let canvas = $image.cropper("getCroppedCanvas");
                let picture = new FileUpload();
                picture.mimeType = "image/png";
                picture.content = isNullOrUndefined(canvas.toDataURL) ? undefined : canvas.toDataURL().split(",")[1];
                picture = isNullOrUndefined(picture.content) ? undefined : picture;
                $rootScope.$broadcast(scope.event, picture);
            });

        };
        return directive;
    });