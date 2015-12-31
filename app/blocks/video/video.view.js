'use strict';

angular.module('immersiveAngularApp')
    .directive('viewVideo', function($sce, $compile, $templateRequest) {
        return {
            restrict: 'E',
            templateUrl: 'blocks/video/video.html',
            scope: {
                parameters: '='
            },
            link: function postLink(scope, elem) {

                scope.videoAPI = null;
                scope.videoStartedOnce = false;
                scope.autoplay = scope.parameters.autoplay;
                scope.loop = scope.parameters.loop;
                scope.buttons = scope.parameters.buttons;

                scope.onPlayerReady = function(API) {
                    scope.videoAPI = API;
                };

                scope.$watch('view', function(newValue) {
                    if (newValue === 'both' && scope.videoStartedOnce === false && scope.autoplay === true) {
                        scope.videoAPI.play();
                        scope.videoStartedOnce = true;
                    }
                });

                scope.$watch('parameters.url', function(newValue) {
                    if (newValue) {
                        var template;
                        var compiled;
                        if (['vimeo', 'deredactie', 'sporza'].indexOf(scope.parameters.host) > -1) {
                            var source = $sce.trustAsResourceUrl(newValue);
                            template = '<div class="{{style}}"><div class="o-video__player youtube embeds"><iframe  src="' + source + '" frameborder="0" allowfullscreen></iframe><figure class="{{parameters.filter}}"></figure></div></div>';
                            compiled = $compile(template)(scope);
                            elem.empty().append(compiled);
                        } else {

                            scope.videogularConfig = {
                                preload: 'none',
                                autoPlay: false,
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
                    }
                });
            }
        };
    });
