'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockImage
 * @description
 * # blockImage
 */
angular.module('immersiveAngularApp')
    .directive('blockImage', function() {
        return {
            template: '<div class="o-block__text {{style}} "><img ng-src="{{url}}"></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },

            link: function postLink(scope) {

                scope.$watch('parameters.css', function(newValue, oldValue) {

                    if (newValue) {
                        scope.style = 'u-width--' + newValue;
                    } else {
                        scope.style = 'u-width--normal';
                    }
                });


                scope.$watch('parameters.flex', function(newValue, oldValue) {

                    if (newValue) {
                        scope.flex = 'u-width--' + newValue;
                    } else {
                        scope.flex = 'u-width--normal';
                    }
                });


                scope.$watch('parameters.url', function(newValue, oldValue) {
                    if (newValue) {
                        scope.url = newValue;
                    };
                });


            }
        };
    });
