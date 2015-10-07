'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockImage
 * @description
 * # blockImage
 */
angular.module('immersiveAngularApp')
    .directive('blockParallax', function() {
        return {
            template: '<div class="o-block high"><div ng-parallax pattern="parameters.url" speed="1" reverse="false"></div></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },
            link: function postLink() {

            }
        };
    });
