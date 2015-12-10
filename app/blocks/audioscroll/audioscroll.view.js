(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .directive('viewAudioscroll', viewAudioscroll);

    function viewAudioscroll() {
        var directive = {
            restrict: 'E',
            template: '<div id="{{ id }}" du-smooth-scroll du-scrollspy="{{ id }}" media="{{ parameters.media }}">AUDIO</div>',
            scope: {
                parameters: '=',
                id: '='
            },
            controller: AudioScrollViewController
        };

        return directive;
    }

    function AudioScrollViewController($rootScope, audioPlayerService) {
        $rootScope.$on('duScrollspy:becameActive', function(event, element, target) {
            var mediaNode = element[0].attributes.media;
            var file = mediaNode.value;

            console.log(file);

            if (file) {
                audioPlayerService.play(file);
            } else {
                audioPlayerService.stop();
            }
        });
    }
})();
