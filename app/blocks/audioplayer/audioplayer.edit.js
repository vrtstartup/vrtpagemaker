(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .directive('editAudioplayer', editAudioPlayer);

    function editAudioPlayer() {
        var directive = {
            restrict: 'E',
            templateUrl: 'blocks/audioplayer/audioplayer.html',
            scope: {
                parameters: '='
            },
            controller: EditAudioPlayerController
        };

        return directive;
    }

    EditAudioPlayerController.$inject = [ '$scope', 'AudioPlayerService' ];

    function EditAudioPlayerController($scope, AudioPlayerService) {
        $scope.play = play;
        $scope.mute = mute;

        activate();

        function activate() {
            $scope.audio = AudioPlayerService.load($scope.parameters.media);
        }

        function play() {
            AudioPlayerService.play($scope.audio);
        }

        function mute() {
            $scope.audio.muting = !$scope.audio.muting;
        }
    }
})();
