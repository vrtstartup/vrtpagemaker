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
            template: '<div><img ng-src="{{parameters.url}}"></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },

            link: function postLink(scope) {

            }
        };
    });
