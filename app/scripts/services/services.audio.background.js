(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .factory('AudioBackgroundService', AudioBackgroundService);

    AudioBackgroundService.$inject = [ 'ngAudio' ];

    function AudioBackgroundService(ngAudio) {
        var playing = false;
        var muted = false;
        var volume = 1;
        var file;
        var audio;

        var service = {
            play: play,
            stop: stop,
            mute: mute,
            isPlaying: isPlaying,
            isMuted: isMuted
        };

        return service;

        function play(newFile) {
            if (file != newFile) {
                file = newFile;

                if (!playing) {
                    fadeIn();
                } else {
                    fadeOut();
                }
            }
        }

        function stop() {
            if (audio) {
                fadeOut();
            }

            file = '';
            playing = false;
        }

        function fadeIn() {
            audio = ngAudio.load(file);
            playing = true;
            audio.volume = 0;
            audio.play();

            var interval = setInterval(function() {
    	        if (audio.volume < volume) {
    	            audio.volume += 0.05;
                    audio.volume = audio.volume.toFixed(2);
    	        } else {
    	            clearInterval(interval);
    	        }
            }, 200);
        }

        function fadeOut() {
            audio.volume = 1;

            var interval = setInterval(function() {
    	        if (audio.volume > 0) {
    	            audio.volume -= 0.05;
                    audio.volume = audio.volume.toFixed(2);
    	        } else {
                    audio.stop();
                    if (file) {
                        fadeIn();
                    }
    	            clearInterval(interval);
    	        }
            }, 200);
        }

        function mute(nowMuted) {
            volume = nowMuted ? 0 : 1;
            muted = nowMuted;
            audio.volume = volume;
        }

        function isPlaying() {
            return playing;
        }

        function isMuted() {
            return muted;
        }
    }
})();
