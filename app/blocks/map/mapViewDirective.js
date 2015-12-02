'use strict';

angular.module('immersiveAngularApp')
    .directive('viewMap', function() {
        return {
            template: '<div class="o-break">test</div>',
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