(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .filter('audioTime', audioTime);

    function audioTime() {
        return audioTimeFilter

        function audioTimeFilter(value) {
            if (value) {
                var time = value.toFixed(0);
                var seconds = time % 60;
                var minutes = (time - seconds) / 60;

                return leadingZero(minutes, 2) + ':' + leadingZero(seconds, 2);
            }

            return '00:00';
        }

        function leadingZero(num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        }
    }
})();
