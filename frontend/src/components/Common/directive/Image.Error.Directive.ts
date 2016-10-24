/// <reference path="../../app/App.Constants.ts" />

angular.module(moduleApp)
    .directive("img", function () {
        return {
            restrict: "E",
            link: function (scope, element, attrs) {
                // show an image-missing image
                element.error(function () {
                    let w = element.width();
                    let h = element.height();
                    // using 20 here because it seems even a missing image will have ~18px width 
                    // after this error function has been called
                    if (w <= 20) { w = 100; }
                    if (h <= 20) { h = 100; }
                    let url = "assets/img/user-role-guest-icon.jpg";
                    element.prop("src", url);
                    element.css("border", "double 3px #cccccc");
                });
            }
        };
    });