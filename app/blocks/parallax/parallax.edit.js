'use strict';

angular.module('immersiveAngularApp')
    .directive('editParallax', function() {
        return {
            template: '<div><figure class="o-cssfilter {{filter}}"><div class="o-block o-parallax" ng-style="style"></div></figure></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },
            link: function postLink(scope) {


                scope.$watch('parameters.filter', function(newValue, oldValue) {
                    if (newValue) {
                        scope.filter = newValue;
                    };
                });


                scope.$watchGroup(['parameters.url', 'parameters.height'], function(newValues, oldValues, scope) {
                    if (newValues) {

                        scope.style = {
                            'background-image': 'url(' + newValues[0] + ')',
                            'height': newValues[1] + 'rem'
                        };
                    }
                });
            }
        };
    });
