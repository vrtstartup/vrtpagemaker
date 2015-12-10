(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .directive('soundIcon', soundIcon);

    function soundIcon() {
        var directive = {
            restrict: 'E',
            template: '<div class="sound-icon" ng-show="playing && !muted" ng-click="onClick()" ng-include="\'icons/volume-on.html\'"></div><div class="sound-icon" ng-show="playing && muted" ng-click="onClick()" ng-include="\'icons/volume-off.html\'"></div>',
            scope: {
            },
            controller: SoundIconController
        };

        return directive;
    }

    SoundIconController.$inject = [ '$scope', 'audioPlayerService' ];

    function SoundIconController($scope, audioPlayerService) {
        $scope.muted = audioPlayerService.isMuted();
        $scope.playing = audioPlayerService.isPlaying();

        $scope.$watch(function () {
            return audioPlayerService.isPlaying();
        }, function (newValue, oldValue) {
            $scope.playing = newValue;
        });

        $scope.$watch(function () {
            return audioPlayerService.isMuted();
        }, function (newValue, oldValue) {
            $scope.muted = newValue;
        });

        $scope.onClick = function () {
            if (audioPlayerService.isMuted()) {
                audioPlayerService.mute(false);
            } else {
                audioPlayerService.mute(true);
            }
        };
    }
})();
