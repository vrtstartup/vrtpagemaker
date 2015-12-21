'use strict';

angular.module('immersiveAngularApp')
    .directive('viewParallax', function() {
        return {
            template: '<div hide-xs class=" o-parallax" ng-style="style"></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },
            link: function postLink(scope) {


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
