/**
 * Created by Andreas on 09.12.2015.
 */
'use strict';
/* Directives */
angular.module('app.directives', [])
    .directive('tablerowtoggle', [function () {
        return {
            link: function (scope, elem, attrs, ctrl) {
                elem.click(function () {
                    $(this).next().toggle(0, function () {
                        $(this).children().fadeToggle(400);
                    });
                });
            }
        }
    }]);
