'use strict';

angular.module('immersiveAngularApp')
    .directive('editCarousel', function() {
        return {
            templateUrl: 'blocks/carousel/carousel.edit.html',
            restrict: 'E',
            scope: {
                id: '=',
                parameters: '='
            },

            link: function postLink(scope) {



                scope.$watch('parameters.time', function(newValue) {
                    if (newValue) {
                        scope.parameters.time = newValue;
                    }
                });


                scope.$watch('parameters.transition', function(newValue) {
                    if (newValue) {
                        scope.parameters.transition = newValue;
                    }
                });



                scope.$watch('parameters.images', function(newValue) {
                    if (newValue) {
                        scope.images = newValue;
                    }
                });

                scope.$watch('parameters.filter', function(newValue) {
                    if (newValue) {
                        scope.filter = newValue;
                    }
                });
            }
        };
    });
