'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockImage
 * @description
 * # blockImage
 */
angular.module('immersiveAngularApp')
    .directive('viewImage', function() {
        return {
            template: '<div><figure class="{{parameters.filter}}"><img ng-src="{{parameters.url}}"></figure></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },

            link: function postLink(scope) {

            }
        };
    });
