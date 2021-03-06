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
                id: '=',
                parameters: '=',
                progress: '='
            },
            link: linkFunc,
            controller: EditAudioPlayerController
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

    EditAudioPlayerController.$inject = [ '$rootScope', '$scope', 'AudioPlayerService' ];

    function EditAudioPlayerController($rootScope, $scope, AudioPlayerService) {
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

        $scope.$watch(function () {
            if (!isNaN($scope.audio.progress) && $scope.audio.progress.toFixed) {
                return $scope.audio.progress.toFixed(3);
            }
        }, function (newValue) {
            if ($scope.progress) {
                $scope.progress(newValue);
            }
        });

        $scope.$on('$destroy', function () {
            AudioPlayerService.stop($scope.id);
        });

        /*
        $rootScope.$on('duScrollspy:becameActive', function(event, element, target) {
            if (element[0].className.indexOf("audio-scroll") < 0) {
                AudioPlayerService.playIfNot(element[0].id);
            }
        });
        */
    }
})();
