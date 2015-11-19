'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockHero
 * @description
 * # blockImage
 */
angular.module('immersiveAngularApp')
    .directive('viewHero', function() {
        return {
            template: '<div class="o-break">test</div>',
            restrict: 'E',
            scope: {
                id: '=',
                article: '=',
                parameters: '='
            },

            link: function postLink(scope) {

            }
        };
    });