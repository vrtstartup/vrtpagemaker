'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockHero
 * @description
 * # blockHero
 */
angular.module('immersiveAngularApp')
    .directive('blockHero', function() {
        return {
            template: '<div><img ng-src="{{url}}"></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },

            link: function postLink(scope) {
                scope.$watch('parameters.url', function(newValue, oldValue) {
                    if (newValue) {
                        scope.url = newValue;
                    };
                });
            }
        };
    });
