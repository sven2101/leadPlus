/// <reference path="../../app/App.Common.ts" />
/// <reference path="../../FileUpload/model/FileUpload.Model.ts" />

angular.module(moduleApp)
    .directive("imagecrop", function ($rootScope) {
        let directive: { restrict: string, scope: any, templateUrl: any, transclude: boolean, link: any };
        directive = { restrict: null, scope: null, templateUrl: null, transclude: null, link: null };
        directive.scope = {
            event: "@",
            defaultpicture: "=",
            quality: "@",
            savebutton: "@"
        };
        directive.restrict = "A";
        directive.templateUrl = function (elem, attr) {
            return "components/Common/view/ImageCrop.html";
        };
        directive.transclude = true;
        directive.link = function (scope, element, attrs) {
            $("#errorMessage").hide();
            scope.hideErrorMessage = function () {
                $("#errorMessage").hide();
            };
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
                        scope.currentFileSize = file.size;
                        if (file.size > 1024 * 1024 * 4) {
                            $("#errorMessage").show();
                            return;
                        } else {
                            $("#errorMessage").hide();
                        }
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
            scope.save = function () {
                let $image = $(".image-crop > img") as any;
                let canvas = $image.cropper("getCroppedCanvas");
                if (isNullOrUndefined(canvas.toDataURL)) {
                    $rootScope.$broadcast(scope.event, undefined);
                    return;
                }

                let picture = new FileUpload();
                picture.mimeType = "image/jpeg";
                picture.filename = "profilepicture";
                if (!isNullOrUndefined(scope.quality) && !isNaN(scope.quality) && scope.quality > 0 && scope.quality < 100) {
                    picture.content = canvas.toDataURL("image/png", scope.quality / 100).split(",")[1];
                    picture.size = Math.round((picture.content.length) * 3 / 4);
                } else {
                    picture.content = canvas.toDataURL("image/png", 0.5).split(",")[1];
                    picture.size = scope.currentFileSize / 2;
                }
                $rootScope.$broadcast(scope.event, picture);
            };

            scope.buildImageCropper();


            scope.$on("saveCroppedImage", function (evt, data) {
                scope.save();
            });

        };
        return directive;
    });