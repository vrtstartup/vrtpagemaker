'use strict';

angular.module('immersiveAngularApp')
    .directive('viewImage', function() {
        return {
            template: '<div><figure class="{{parameters.filter}}"><img ng-src="{{parameters.url}}"></figure><view-audioplayer ng-if="parameters.media" parameters="parameters"></view-audioplayer></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },

            link: function postLink(scope) {

            }
        };
    });
