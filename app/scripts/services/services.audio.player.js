(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .factory('AudioPlayerService', AudioPlayerService);

    AudioPlayerService.$inject = [ 'ngAudio' ];

    function AudioPlayerService(ngAudio) {
        var files = {};
        var currentPlaying;

        var service = {
            load: load,
            play: play,
            playIfNot: playIfNot
        };

        return service;

        function load(id, file) {
            var audio = ngAudio.load(file);
            files[id] = audio;
            return audio;
        }

        function play(id) {
            var audio = files[id];

            if (currentPlaying && currentPlaying != audio) {
                currentPlaying.pause();
            }

            if (audio.paused) {
                audio.play();
                currentPlaying = audio;
            } else {
                audio.pause();
                currentPlaying = null;
            }
        }

        function playIfNot(id) {
            var audio = files[id];

            if (currentPlaying && currentPlaying != audio) {
                currentPlaying.pause();
            }

            if (audio.paused) {
                audio.play();
                currentPlaying = audio;
            }
        }
    }
})();
