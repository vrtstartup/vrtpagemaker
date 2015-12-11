'use strict';

angular.module('immersiveAngularApp')
    .directive('viewLinepainter', function() {
        return {
            template: '<div><figure class="{{parameters.filter}}"><img ng-src="{{parameters.url}}"></figure></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },

            link: function postLink(scope) {

            }
        };
    });
