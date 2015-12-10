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

    SoundIconController.$inject = [ '$scope', 'AudioBackgroundService' ];

    function SoundIconController($scope, AudioBackgroundService) {
        $scope.muted = AudioBackgroundService.isMuted();
        $scope.playing = AudioBackgroundService.isPlaying();

        $scope.$watch(function () {
            return AudioBackgroundService.isPlaying();
        }, function (newValue, oldValue) {
            $scope.playing = newValue;
        });

        $scope.$watch(function () {
            return AudioBackgroundService.isMuted();
        }, function (newValue, oldValue) {
            $scope.muted = newValue;
        });

        $scope.onClick = function () {
            if (AudioBackgroundService.isMuted()) {
                AudioBackgroundService.mute(false);
            } else {
                AudioBackgroundService.mute(true);
            }
        };
    }
})();
