'use strict';

angular.module('immersiveAngularApp')
    .directive('editBreak', function() {
        return {
            template: '<div class="o-break" flex="100"></div>',
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
