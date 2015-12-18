(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .directive('viewAudioscroll', viewAudioscroll);

    function viewAudioscroll() {
        var directive = {
            restrict: 'E',
            template: '<div id="{{ id }}" class="c-audioscroll" du-smooth-scroll du-scrollspy="{{ id }}" media="{{ parameters.media }}">AUDIO</div>',
            scope: {
                id: '=',
                parameters: '='
            },
            controller: AudioScrollViewController
        };

        return directive;
    }

    function AudioScrollViewController($rootScope, $scope, AudioBackgroundService) {
        $rootScope.$on('duScrollspy:becameActive', function(event, element, target) {
            if (element[0].className.indexOf("c-audioscroll") > -1) {
                var mediaNode = element[0].attributes.media;
                var file = mediaNode.value;

                if (file) {
                    AudioBackgroundService.play(file);
                } else {
                    AudioBackgroundService.stop();
                }
            }
        });
    }
})();
