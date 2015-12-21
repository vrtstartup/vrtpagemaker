(function() {
    'use strict';

    angular.module('immersiveAngularApp')
        .directive('viewAudioscroll', function(AudioBackgroundService) {
            return {
                restrict: 'E',
                template: '<div id="{{ id }}" class="c-audioscroll" media="{{ parameters.media }}"></div>',
                scope: {
                    id: '=',
                    parameters: '=',
                    view: '='
                },
                link: function postLink(scope) {
                    scope.$watch('view', function(newValue) {
                        if (newValue === 'both') {
                            if (scope.parameters.media) {
                                AudioBackgroundService.play(scope.parameters.media);
                            } else {
                                AudioBackgroundService.stop();
                            }
                        }
                    });
                }
            };
        });
})();
