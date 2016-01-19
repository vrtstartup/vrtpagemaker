'use strict';

angular.module('immersiveAngularApp')
    .directive('editSvg', function($compile) {
        return {
            template: '<div  in-view="view = $inviewpart"></div>',
            // templateNamespace: 'svg',
            restrict: 'E',
            replace: 'true',
            scope: {
                parameters: '='
            },
            link: function postLink(scope, ele) {
                scope.$watch('parameters.svg', function(newValue) {
                    if (newValue) {
                        var template = newValue;

                        ele.empty();
                        ele.append(template);
                        $compile(template)(scope);


                    }
                });
            }
        };
    });
