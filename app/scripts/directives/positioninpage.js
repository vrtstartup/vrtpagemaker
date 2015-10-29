'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:positionInPage
 * @description
 * # positionInPage
 */
angular.module('immersiveAngularApp')
    .directive('positionInPage', function($window, $document, $analytics) {
        return {
            template: '<div class="o-positioninstory__done" style="width:{{positionInStory}}%"></div>',
            restrict: 'E',
            scope: {
                article: '='
            },
            link: function postLink(scope) {

                scope.positionInStory = 0;
                var reached10 = false;
                var reached20 = false;
                var reached30 = false;
                var reached40 = false;
                var reached50 = false;
                var reached60 = false;
                var reached70 = false;
                var reached80 = false;
                var reached90 = false;
                var reached100 = false;

                // Get scrollposition
                var getPositionInTekst = function(totalHeight, innerHeight, scroll) {
                    return 100 / (totalHeight - innerHeight) * scroll;
                };


                var sendAnalytics = function(position) {
                    $analytics.eventTrack(position, {
                        category: 'scrolling',
                        label: scope.article
                    });
                };
                $document.on('scroll', function() {
                    var totalHeight = $document[0].body.scrollHeight;
                    var innerHeight = $window.innerHeight;
                    var scroll = $document.scrollTop();
                    var positionInStory = getPositionInTekst(totalHeight, innerHeight, scroll);
                    var roundedPosition = Number((positionInStory).toFixed(0));
                    scope.positionInStory = roundedPosition;
                    scope.$apply();



                    if (scope.positionInStory >= 10 && reached10 === false) {
                        sendAnalytics('10%');
                        reached10 = true;
                    }
                    if (scope.positionInStory >= 20 && reached20 === false) {
                        sendAnalytics('20%');
                        reached20 = true;
                    }
                    if (scope.positionInStory >= 30 && reached30 === false) {
                        sendAnalytics('30%');
                        reached30 = true;
                    }
                    if (scope.positionInStory >= 40 && reached40 === false) {
                        sendAnalytics('40%');
                        reached40 = true;
                    }
                    if (scope.positionInStory >= 50 && reached50 === false) {
                        sendAnalytics('50%');
                        reached50 = true;
                    }

                    if (scope.positionInStory >= 60 && reached60 === false) {
                        sendAnalytics('60%');
                        reached60 = true;
                    }

                    if (scope.positionInStory >= 70 && reached70 === false) {
                        sendAnalytics('70%');
                        reached70 = true;
                    }
                    if (scope.positionInStory >= 80 && reached80 === false) {
                        sendAnalytics('80%');
                        reached80 = true;
                    }

                    if (scope.positionInStory >= 90 && reached90 === false) {
                        sendAnalytics('90%');
                        reached90 = true;
                    }

                    if (scope.positionInStory >= 100 && reached100 === false) {
                        sendAnalytics('100%');
                        reached100 = true;
                    }
                });


            }
        };
    });
