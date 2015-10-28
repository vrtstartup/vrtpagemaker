'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blocks
 * @description
 * # blocks
 */
angular.module('immersiveAngularApp')
    .directive('blocksViewDispatcher', function($compile, blocksValues) {
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
                var template = blocksValues.viewdirectives(scope.type);
                var compiled = $compile(template)(scope);
                elem.empty().append(compiled);

            }
        };
    });
