'use strict';

angular.module('immersiveAngularApp')
    .directive('viewMasonry', function() {
        return {
            template: '<div class="masonry"><img ng-repeat="image in images track by $index" ng-src="{{ image }}"></div>',
            restrict: 'E',
            scope: {
                id: '=',
                parameters: '='
            },

            link: function postLink(scope) {
                scope.$watch('parameters.images', function(newValue, oldValue) {
                    if (newValue) {
                        scope.images = newValue;
                    };
                });

                scope.$watch('parameters.filter', function(newValue, oldValue) {
                    if (newValue) {
                        scope.filter = newValue;
                    };
                });
            }
        };
    });
