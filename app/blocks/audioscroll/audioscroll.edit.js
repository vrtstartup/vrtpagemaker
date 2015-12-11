(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .directive('editAudioscroll', editAudioscroll);

    function editAudioscroll() {
        var directive = {
            restrict: 'E',
            template: '<div id="{{ id }}" class="audio-scroll" du-smooth-scroll du-scrollspy="{{ id }}" media="{{ parameters.media }}">AUDIO</div>',
            scope: {
                id: '=',
                parameters: '='
            },
            controller: AudioScrollController
        };

        return directive;
    }

    function AudioScrollController($rootScope, AudioBackgroundService) {
        $rootScope.$on('duScrollspy:becameActive', function(event, element, target) {
            if (element[0].className.indexOf("audio-scroll") > -1) {
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
