'use strict';

angular.module('immersiveAngularApp')
    .directive('viewText', function($compile) {
        return {
            restrict: 'E',
            scope: {
                id: '=',
                article: '=',
                parameters: '='
            },
            link: function postLink(scope, ele) {
                ele.html('<div class="o-block__text" in-view="view = $inviewpart">' + scope.parameters.text + '</div><view-audioplayer start="view" ng-if="parameters.media" id="id" parameters="parameters"></view-audioplayer>');
                $compile(ele.contents())(scope);


            }
        };
    });
