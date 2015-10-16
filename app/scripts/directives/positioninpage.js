'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:positionInPage
 * @description
 * # positionInPage
 */
angular.module('immersiveAngularApp')
    .directive('positionInPage', function($window, $document) {
        return {
            template: '<div class="o-positioninstory__done" style="width:{{positionInStory}}%"></div>',
            restrict: 'E',
            link: function postLink(scope) {

                scope.positionInStory = 0;
                // Get scrollposition
                var getPositionInTekst = function(totalHeight, innerHeight, scroll) {
                    return 100 / (totalHeight - innerHeight) * scroll;
                };
                $document.on('scroll', function() {
                    var totalHeight = $document[0].body.scrollHeight;
                    var innerHeight = $window.innerHeight;
                    var scroll = $document.scrollTop();
                    var positionInStory = getPositionInTekst(totalHeight, innerHeight, scroll);
                    var roundedPosition = Number((positionInStory).toFixed(1));
                    scope.positionInStory = roundedPosition;
                    console.log(scope.positionInStory);
                     scope.$apply();
                });


            }
        };
    });
