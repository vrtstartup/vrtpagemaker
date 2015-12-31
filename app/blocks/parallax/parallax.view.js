'use strict';

angular.module('immersiveAngularApp')
    .directive('viewParallax', function() {
        return {
            templateUrl: 'blocks/parallax/parallax.html',

            restrict: 'E',
            scope: {
                parameters: '='
            },
            link: function postLink(scope) {




                scope.style = {
                    'background-image': 'url(' + scope.parameters.url + ')',
                    'height': scope.parameters.height
                };



            }
        };
    });
