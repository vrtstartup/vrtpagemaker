(function() {
    'use strict';

    angular.module('immersiveAngularApp')
        .directive('viewAudioplayer', function(AudioPlayerService, $analytics) {
            return {
                templateUrl: 'blocks/audioplayer/audioplayer.html',
                restrict: 'E',
                replace: 'true',
                scope: {
                    id: '=',
                    parameters: '=',
                    start: '='
                },

                link: function postLink(scope, el) {



                    scope.playing = false;
                    scope.play = play;
                    scope.mute = mute;
                    scope.onClick = onClick;
                    scope.onHover = onHover;



                    function activate() {
                        scope.audio = AudioPlayerService.load(scope.id, scope.parameters.media);

                    }

                    function play() {

                        AudioPlayerService.play(scope.id);
                        scope.playing = true;
                        $analytics.eventTrack('play', {
                            category: 'audio',
                            label: scope.parameters.media
                        });
                    }

                    function mute() {
                        scope.audio.muting = !scope.audio.muting;
                    }

                    function onClick() {
                        if (scope.parameters.action === 'click' && scope.audio.paused) {
                            // TODO
                            // play();
                        }
                    }

                    function onHover() {
                        if (scope.parameters.action === 'hover' && scope.audio.paused) {
                            // TODO
                            // play();
                        }
                    }

                    scope.$watchGroup(['id', 'parameters.media'], function(newValues, scope) {
                        if (newValues[0 && newValues[1]]) {
                            activate();
                        }
                    });


                    scope.$watch('start', function(newValue) {
                        if (newValue === 'both' && scope.playing === false) {

                            // play();

                        }
                    });


                    el[0].parentElement.addEventListener('click', function() {
                        scope.onClick();
                    });

                    el[0].parentElement.addEventListener('mouseenter', function() {
                        scope.onHover();
                    });




                }
            };
        });

})();




//     'use strict';

//     angular
//     .module('immersiveAngularApp')
//     .directive('viewAudioplayer', viewAudioplayer);

//     function viewAudioplayer() {
//         var directive = {
//             restrict: 'E',
//             templateUrl: 'blocks/audioplayer/audioplayer.html',
//             scope: {
//                 id: '=',
//                 parameters: '=',
//                 start: '='
//             },
//             link: linkFunc,
//             controller: ViewAudioPlayerController
//         };

//         function linkFunc($scope, elements) {
//             elements[0].parentElement.addEventListener('click', function() {
//                 $scope.onClick();
//             });

//             elements[0].parentElement.addEventListener('mouseenter', function() {
//                 $scope.onHover();
//             });
//         }

//         return directive;
//     }

//     ViewAudioPlayerController.$inject = ['$scope', 'AudioPlayerService'];






// }
// })();
