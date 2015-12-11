'use strict';

angular.module('immersiveAngularApp')
    .directive('viewText', function($compile) {
        return {
            template: '<div class="o-block__text" ng-bind-html="text"></div>',
            restrict: 'E',
            scope: {
                id: '=',
                article: '=',
                parameters: '='
            },
            link: function postLink(scope, ele) {
                // scope.text = $sce.trustAsHtml(scope.parameters.text);

                ele.html(scope.parameters.text);
                $compile(ele.contents())(scope);


            }
        };
    });
