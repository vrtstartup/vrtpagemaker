'use strict';

angular.module('immersiveAngularApp')
    .directive('editImage', function() {
        return {
            template: '<div><figure class="{{filter}}"><img ng-src="{{url}}"></figure><edit-audioplayer ng-if="parameters.media" id="id" parameters="parameters"></edit-audioplayer></div>',
            restrict: 'E',
            scope: {
                id: '=',
                parameters: '='
            },

            link: function postLink(scope) {
                scope.$watch('parameters.url', function(newValue, oldValue) {
                    if (newValue) {
                        scope.url = newValue;
                    };
                });

                scope.$watch('parameters.filter', function(newValue, oldValue) {
                    if (newValue) {
                        scope.filter = newValue;
                    };
                });
            }
        };
    });
