'use strict';

angular.module('immersiveAngularApp')
    .directive('editImage', function() {
        return {
            template: '<div><figure class="o-cssfilter {{filter}}"><img class="c-imageblock__image" ng-src="{{url}}"></figure><edit-audioplayer ng-if="parameters.media" id="id" parameters="parameters"></edit-audioplayer></div>',
            restrict: 'E',
            scope: {
                id: '=',
                parameters: '='
            },

            link: function postLink(scope) {
                scope.$watch('parameters.url', function(newValue) {
                    if (newValue && newValue !== null && newValue !== '') {
                        scope.url = newValue;
                    } else {
                        scope.url = 'images/placeholder.png';
                    }
                });

                scope.$watch('parameters.filter', function(newValue) {
                    if (newValue) {
                        scope.filter = newValue;
                    }
                });
            }
        };
    });
