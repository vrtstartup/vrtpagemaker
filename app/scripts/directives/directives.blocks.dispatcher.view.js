'use strict';

angular.module('immersiveAngularApp')
    .directive('blocksDispatcherView', function($compile, valuesService) {
        return {
            template: '<div ></div>',
            restrict: 'E',
            scope: {
                type: '=',
                parameters: '=',
                id: '=',
                article: '=',
                view: '='
            },
            link: function postLink(scope, elem) {
                var template = valuesService.viewdirectives(scope.type);
                var compiled = $compile(template)(scope);
                elem.empty().append(compiled);

            }
        };
    });
