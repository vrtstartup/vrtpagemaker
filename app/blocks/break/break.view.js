'use strict';

angular.module('immersiveAngularApp')
    .directive('viewBreak', function() {
        return {
            template: '<div class="o-break"></div>',
            restrict: 'E',
            scope: {
                id: '=',
                article: '=',
                parameters: '='
            },

            link: function postLink(scope) {

            }
        };
    });