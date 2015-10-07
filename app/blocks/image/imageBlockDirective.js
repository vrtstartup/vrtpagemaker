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
            template: '<div class="o-block"><img ng-src="{{parameters.url}}" class="{{style}}"></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },

            link: function postLink(scope) {
                scope.$watch('parameters.css', function(newValue, oldValue) {
                    if (newValue) {
                        console.log('changing css to ' + newValue);
                        scope.style = 'o-block__image--' + newValue;
                    } else {
                        console.log('changing css to ' + newValue);
                        scope.style = 'o-block__image';
                    }
                });
            }
        };
    });
