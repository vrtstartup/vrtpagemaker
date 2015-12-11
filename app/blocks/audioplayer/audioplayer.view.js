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
                id: '=',
                parameters: '='
            },
            link: linkFunc,
            controller: ViewAudioPlayerController
        };

        function linkFunc($scope, elements) {
            elements[0].parentElement.addEventListener('click', function () {
                $scope.onClick();
            });

            elements[0].parentElement.addEventListener('mouseenter', function () {
                $scope.onHover();
            });
        }

        return directive;
    }

    ViewAudioPlayerController.$inject = [ '$rootScope', '$scope', 'AudioPlayerService' ];

    function ViewAudioPlayerController($rootScope, $scope, AudioPlayerService) {
        $scope.play = play;
        $scope.mute = mute;
        $scope.onClick = onClick;
        $scope.onHover = onHover;

        activate();

        function activate() {
            $scope.audio = AudioPlayerService.load($scope.id, $scope.parameters.media);
        }

        function play() {
            AudioPlayerService.play($scope.id);
        }

        function mute() {
            $scope.audio.muting = !$scope.audio.muting;
        }

        function onClick() {
            if ($scope.parameters.action == 'click' && $scope.audio.paused) {
                // TODO
                // play();
            }
        }

        function onHover() {
            if ($scope.parameters.action == 'hover' && $scope.audio.paused) {
                // TODO
                // play();
            }
        }

        /*
        $rootScope.$on('duScrollspy:becameActive', function(event, element, target) {
            if (element[0].className.indexOf("audio-scroll") < 0) {
                AudioPlayerService.playIfNot(element[0].id);
            }
        });
        */
    }
})();
