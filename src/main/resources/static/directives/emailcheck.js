/**
 * Created by Andreas on 09.12.2015.
 */

'use strict';

/* Directives */
angular.module('app.directives', [])
    .directive('emailCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstEmail = '#' + attrs.emailCheck;
                elem.add(firstEmail).on('keyup', function () {
                    scope.$apply(function () {
                        // console.info(elem.val() === $(firstPassword).val());
                        ctrl.$setValidity('emailmatch', elem.val() === $(firstEmail).val());
                    });
                });
            }
        }
    }]);
