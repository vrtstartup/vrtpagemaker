'use strict';

angular.module('immersiveAngularApp')
    .directive('blocksDispatcherEdit', function($compile, valuesService) {
        return {
            template: '<div></div>',
            restrict: 'E',
            scope: {
                type: '=',
                parameters: '=',
                id: '=',
                article: '='
            },
            link: function postLink(scope, elem) {
                var template = valuesService.editdirectives(scope.type);
                var compiled = $compile(template)(scope);
                elem.empty().append(compiled);

            }
        };
    });
