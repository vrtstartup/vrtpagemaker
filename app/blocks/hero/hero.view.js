'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockHero
 * @description
 * # blockHero
 */
angular.module('immersiveAngularApp')
    .directive('viewHero', function($sce) {
        return {
            // templateUrl: 'blocks/hero/hero.edit.html',
            template: '<div class="o-hero"><div class="o-hero__"><figure class="o-cssfilter {{filter}}"><img ng-show="parameters.mimetype == \'image\'" class="o-hero__image" ng-src="{{parameters.url}}"><div class="o-videogular" ng-show="parameters.mimetype == \'video\'"><videogular in-view="view = $inviewpart" vg-player-ready="onPlayerReady($API)"><vg-media vg-loop="loop" vg-src="videogularConfig.sources" vg-youtube="rel=1;showinfo=1" vg-tracks="videogularConfig.tracks" vg-native-controls="false"></vg-media><div ng-hide="buttons"><vg-controls vg-autohide="videogularConfig.plugins.controls.autoHide" vg-autohide-time="videogularConfig.plugins.controls.autoHideTime"><div ng-click="videoAPI.play()"  class="o-videogular__playback"><div ng-include="\'icons/replay.html\'"></div></vg-controls></div><vg-poster vg-url="controller.config.plugins.poster"></vg-poster></videogular></div></figure><div class="o-hero__text" layout="row" layout-align="{{parameters.xaxis}} {{parameters.yaxis}}"><div><p ng-bind-html="theText"></p></div></div></div></div>',
            restrict: 'E',
            scope: {
                id: '=',
                article: '=',
                parameters: '='
            },

            link: function postLink(scope) {


                scope.$watch('parameters.text', function(newValue) {
                    scope.theText = $sce.trustAsHtml(newValue);
                });





                scope.videoAPI = null;
                scope.videoStartedOnce = false;
                scope.autoplay = false;
                scope.loop = false;
                scope.buttons = true;
                scope.mute = false;
                scope.mimetype = 'image';


                scope.$watch('parameters.mimetype', function(newValue) {
                    if (newValue && newValue !== '') {

                        if (newValue.indexOf('video') > -1) {
                            scope.mimetype = 'video';
                        }
                    }
                });

                scope.$watch('parameters.autoplay', function(newValue) {
                    if (newValue && newValue !== '') {
                        scope.autoplay = newValue;
                    }
                });

                scope.$watch('parameters.loop', function(newValue) {
                    if (newValue && newValue !== '') {
                        scope.loop = newValue;
                    }
                });

                scope.$watch('parameters.buttons', function(newValue) {
                    if (newValue && newValue !== '') {
                        scope.buttons = newValue;
                    }
                });

                scope.$watch('parameters.buttons', function(newValue) {
                    if (newValue && newValue !== '') {
                        scope.buttons = newValue;
                    }
                });

                scope.onPlayerReady = function(API) {
                    scope.videoAPI = API;
                };

                scope.$watch('view', function(newValue) {
                    if (newValue === 'both' && scope.videoStartedOnce === false && scope.autoplay === true) {
                        scope.videoAPI.setVolume(0);
                        scope.videoAPI.play();
                        scope.videoStartedOnce = true;
                    }
                });




                scope.$watch('parameters.url', function(newValue) {
                    if (newValue && newValue !== '') {
                        scope.videogularConfig = {
                            preload: 'none',
                            autoPlay: scope.autoplay,
                            sources: [{
                                src: $sce.trustAsResourceUrl(newValue),
                                type: 'video/mp4'
                            }],
                            analytics: {
                                category: 'Video',
                                label: newValue,
                                events: {
                                    ready: true,
                                    play: true,
                                    pause: true,
                                    stop: true,
                                    complete: true,
                                    progress: 10
                                }
                            },
                            plugins: {
                                poster: scope.parameters.poster,
                                controls: {
                                    autoHide: true,
                                    autoHideTime: 3000
                                }
                            }

                        };


                    }
                });

            }

        };
    });
