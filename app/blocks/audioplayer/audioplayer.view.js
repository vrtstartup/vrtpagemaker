(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .directive('viewAudioplayer', viewAudioplayer);

    function viewAudioplayer() {
        var directive = {
            restrict: 'E',
            templateUrl: 'blocks/audioplayer/audioplayer.html',
            scope: {
                parameters: '='
            },
            controller: ViewAudioplayerController
        };

        return directive;
    }

    ViewAudioplayerController.$inject = [ '$scope', 'AudioPlayerService' ];

    function ViewAudioplayerController($scope, AudioPlayerService) {
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
