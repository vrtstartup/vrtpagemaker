'use strict';

angular.module('immersiveAngularApp')
    .directive('viewText', function($sce) {
        return {
            template: '<div class="o-block__text" ng-bind-html="text"></div>',
            restrict: 'E',
            scope: {
                id: '=',
                article: '=',
                parameters: '='
            },
            link: function postLink(scope) {
                scope.text = scope.parameters.text;
            }
        };
    });
