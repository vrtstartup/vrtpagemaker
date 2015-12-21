'use strict';

angular.module('immersiveAngularApp')
    .directive('editParallax', function(parallaxHelper) {
        return {
            template: '<div class="o-block o-parallax" ng-style="style"></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },
            link: function postLink(scope) {


                scope.$watchGroup(['parameters.url', 'parameters.height'], function(newValues, oldValues, scope) {
                    if (newValues) {
                        console.log(newValues);
                        scope.style = {
                            'background-image': 'url(' + newValues[0] + ')',
                            'height': newValues[1] + 'rem'
                        };


                    };
                });









            }
        };
    });


//https://github.com/oblador/angular-parallax
