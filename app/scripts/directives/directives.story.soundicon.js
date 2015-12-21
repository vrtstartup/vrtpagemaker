(function() {
    'use strict';


    function SoundIconController($scope, AudioBackgroundService) {
        $scope.muted = AudioBackgroundService.isMuted();
        $scope.playing = AudioBackgroundService.isPlaying();

        $scope.$watch(function() {
            return AudioBackgroundService.isPlaying();
        }, function(newValue) {
            $scope.playing = newValue;
        });

        $scope.$watch(function() {
            return AudioBackgroundService.isMuted();
        }, function(newValue) {
            $scope.muted = newValue;
        });

        $scope.onClick = function() {
            if (AudioBackgroundService.isMuted()) {
                AudioBackgroundService.mute(false);
            } else {
                AudioBackgroundService.mute(true);
            }
        };
    }


    function soundIcon() {
        var directive = {
            restrict: 'E',
            template: '<div class="c-mutebackground" ng-show="playing && !muted" ng-click="onClick()" ng-include="\'icons/volume-on.html\'"></div><div class="c-mutebackground" ng-show="playing && muted" ng-click="onClick()" ng-include="\'icons/volume-off.html\'"></div>',
            scope: {},
            controller: SoundIconController
        };

        return directive;
    }



    SoundIconController.$inject = ['$scope', 'AudioBackgroundService'];



    angular
        .module('immersiveAngularApp')
        .directive('soundIcon', soundIcon);


})();
