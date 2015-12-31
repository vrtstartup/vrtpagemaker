'use strict';

angular.module('immersiveAngularApp')
    .directive('editIframe', function($sce) {
        return {
            template: '<div class="c-embed-container"><iframe src="{{iframe}}" frameborder="0"></iframe><edit-audioplayer ng-if="parameters.media" id="id" parameters="parameters"></edit-audioplayer></div>',
            restrict: 'E',
            scope: {
                id: '=',
                parameters: '='
            },

            link: function postLink(scope) {
                var code = scope.parameters.code;
                scope.iframe = getUrl(code);

                scope.$watch('parameters.code', function(newValue, oldValue) {
                    if (newValue) {
                        scope.iframe = getUrl(newValue);
                    };
                });

            }
        };

        function getUrl(value) {
            var regex1 = /<iframe.*?src="(.*?)"/;
            var regex2 = /<iframe.*?src='(.*?)'/;
            var parts = regex1.exec(value);
            var url;

            if (!parts) {
                parts = regex2.exec(value);
            }

            if (parts) {
                url = parts[1];
            } else {
                url = value;
            }

            return $sce.trustAsResourceUrl(url);
        }
    });
