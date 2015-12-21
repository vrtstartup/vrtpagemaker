'use strict';

angular.module('immersiveAngularApp')
    .directive('viewCarousel', function() {
        return {
            templateUrl: 'blocks/carousel/carousel.html',
            restrict: 'E',
            scope: {
                id: '=',
                parameters: '=',
            },

            link: function postLink(scope) {


                var interval;


                function onProgress(value) {
                    var part = 1 / scope.images.length;
                    var number = Math.floor(value / part);

                    if (!isNaN(number)) {
                        select(number);
                    }
                }

                function select(number) {
                    scope.current = number;
                }

                function start() {
                    interval = setInterval(function() {

                        next();
                    }, scope.time);
                }

                function stop() {
                    clearInterval(interval);
                }

                function previous() {
                    scope.current--;
                    if (scope.current < 0) {
                        scope.current = scope.images.length - 1;
                    }
                }

                function next() {
                    scope.current++;


                    if (scope.current >= scope.images.length) {

                        scope.current = 0;
                    }
                }

                function onClickPrevious() {
                    stop();
                    previous();
                }

                function onClickNext() {
                    stop();
                    next();
                }



                scope.$watch('parameters.time', function(newValue) {
                    if (newValue) {
                        scope.time = scope.parameters.time;
                    } else {
                        scope.time = 5000;
                    }
                });





                scope.current = 0;

                scope.onProgress = onProgress;
                scope.onClickPrevious = onClickPrevious;
                scope.onClickNext = onClickNext;




                scope.$watch(function() {
                    return scope.parameters.media;
                }, function(newValue) {
                    if (newValue) {
                        start();
                    } else {
                        start();
                    }
                });



                scope.$watch('parameters.images', function(newValue) {
                    if (newValue) {
                        scope.images = newValue;
                    }
                });

                scope.$watch('parameters.filter', function(newValue) {
                    if (newValue) {
                        scope.filter = newValue;
                    }
                });
            },

        };
    });
