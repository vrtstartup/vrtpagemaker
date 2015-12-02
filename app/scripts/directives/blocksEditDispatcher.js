'use strict';

angular.module('immersiveAngularApp')
    .directive('blocksEditDispatcher', function($compile, blocksValues) {
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
                var template = blocksValues.editdirectives(scope.type);
                var compiled = $compile(template)(scope);
                elem.empty().append(compiled);

            }
        };
    });
