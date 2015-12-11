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
            playIfNot: playIfNot,
            stop: stop,
            get: get
        };

        return service;

        function load(id, file) {
            var audio = ngAudio.load(file);
            files[id] = audio;
            return audio;
        }

        function play(id) {
            var audio = get(id);

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
            var audio = get(id);

            if (currentPlaying && currentPlaying != audio) {
                currentPlaying.pause();
            }

            if (audio.paused) {
                audio.play();
                currentPlaying = audio;
            }
        }

        function stop(id) {
            var audio = get(id);
            audio.stop();
        }

        function get(id) {
            return files[id];
        }
    }
})();
