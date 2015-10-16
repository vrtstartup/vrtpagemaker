'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockImage
 * @description
 * # blockImage
 */
angular.module('immersiveAngularApp')
    .directive('viewIframe', function($sce) {
        return {
            template: '<div class="iframe"><iframe width="100%" height="auto" src="{{iframe}}" frameborder="0" webkit-playsinline allowfullscreen></iframe></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },

            link: function postLink(scope) {
                scope.iframe = $sce.trustAsResourceUrl(scope.parameters.code);
            }
        };
    });
