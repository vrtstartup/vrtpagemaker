(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .directive('editAudioscroll', editAudioscroll);

    function editAudioscroll() {
        var directive = {
            restrict: 'E',
            template: '<div id="{{ id }}" du-smooth-scroll du-scrollspy="{{ id }}" media="{{ parameters.media }}">AUDIO</div>',
            scope: {
                parameters: '=',
                id: '='
            },
            controller: AudioScrollController
        };

        return directive;
    }

    function AudioScrollController($rootScope, AudioBackgroundService) {
        $rootScope.$on('duScrollspy:becameActive', function(event, element, target) {
            var mediaNode = element[0].attributes.media;
            var file = mediaNode.value;

            if (file) {
                AudioBackgroundService.play(file);
            } else {
                AudioBackgroundService.stop();
            }
        });
    }
})();
