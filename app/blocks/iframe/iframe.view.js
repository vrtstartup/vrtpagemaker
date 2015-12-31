'use strict';

angular.module('immersiveAngularApp')
    .directive('viewIframe', function($sce) {
        return {
            template: '<div class="c-embed-container"><iframe ng-src="{{iframe}}" frameborder="0"></iframe><view-audioplayer ng-if="parameters.media" id="id" parameters="parameters"></view-audioplayer></div>',
            restrict: 'E',
            scope: {
                id: '=',
                parameters: '='
            },

            link: function postLink(scope) {


                scope.iframe = $sce.trustAsResourceUrl(scope.parameters.code);




            }
        };
    });
