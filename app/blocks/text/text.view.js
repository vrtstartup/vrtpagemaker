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
                ele.html('<div class="o-block__text">' + scope.parameters.text + '</div><view-audioplayer ng-if="parameters.media" id="id" parameters="parameters"></view-audioplayer>');
                $compile(ele.contents())(scope);


            }
        };
    });
