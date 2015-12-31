'use strict';

angular.module('immersiveAngularApp')
    .directive('viewImage', function() {
        return {
            template: '<div in-view="view = $inviewpart"><figure class="o-cssfilter {{parameters.filter}}"><img class="c-imageblock__image " ng-src="{{parameters.url}}"></figure><view-audioplayer ng-if="parameters.media"  start="view" id="id" parameters="parameters"></view-audioplayer></div>',
            restrict: 'E',
            scope: {
                id: '=',
                parameters: '=',
            },

            link: function postLink(scope) {


            }
        };
    });
