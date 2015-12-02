'use strict';

angular.module('immersiveAngularApp')
    .directive('editIframe', function($sce) {
        return {
            template: '<div class="iframe"><iframe width="100%" height="auto" src="{{iframe}}" frameborder="0" webkit-playsinline allowfullscreen></iframe></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },

            link: function postLink(scope) {





                scope.$watch('parameters.code', function(newValue, oldValue) {
                    if (newValue) {
                        scope.iframe = $sce.trustAsResourceUrl(newValue);

                    };
                });

            }
        };
    });
