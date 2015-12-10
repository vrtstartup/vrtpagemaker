(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .factory('AudioPlayerService', AudioPlayerService);

    AudioPlayerService.$inject = [ 'ngAudio' ];

    function AudioPlayerService(ngAudio) {
        var last;

        var service = {
            load: load,
            play: play
        };

        return service;

        function load(file) {
            return ngAudio.load(file);
        }

        function play(audio) {
            if (last && last != audio) {
                last.pause();
            }

            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }

            last = audio;
        }
    }
})();
