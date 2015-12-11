'use strict';

angular.module('immersiveAngularApp')
    .directive('editSvg', function($compile) {
        return {
            template: '<svg version="1.1" id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1280 800"  xml:space="preserve">{{svg}}</svg>',
            templateNamespace: 'svg',
            restrict: 'E',
            replace: 'true',
            scope: {
                parameters: '='
            },
            link: function postLink(scope, ele) {
                scope.$watch('parameters.svg', function(newValue) {
                    if (newValue) {
                        ele.html(scope.parameters.svg);
                        $compile(ele.contents())(scope);
                    }
                });
            }
        };
    });
