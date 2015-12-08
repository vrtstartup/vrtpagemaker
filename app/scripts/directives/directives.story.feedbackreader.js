(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .directive('feedbackReader', feedbackReader);

    feedbackReader.$inject = [ '$mdDialog' ];

    function feedbackReader($mdDialog) {
        var directive = {
            restrict: 'E',
            template: '<div class="feedback-button" ><md-button ng-click="showDialog()" class="md-raised md-primary">Feedback</md-button></div>',
            scope: {
                article: '='
            },
            link: function postLink($scope) {


                function showDialog($event) {
                    var parentEl = angular.element(document.body);
                    $mdDialog.show({
                        parent: parentEl,
                        targetEvent: $event,
                        templateUrl: 'views/templates.dialog.story.feedbackreader.html',
                        clickOutsideToClose: true,
                        locals: {
                            article: $scope.article
                        },
                        controller: FeedbackController
                    });
                }

                $scope.showDialog = function() {
                    showDialog();
                };


            }
        };

        return directive;
    }

    function FeedbackController($scope, $window, $mdDialog, firebaseMainService, article) {

        $scope.closeDialog = function() {
            $mdDialog.cancel();
        };

        $scope.addFeedback = function(name, feedback) {

            var screenHeight = $window.innerHeight;
            var screenWidth = $window.innerWidth;
            var userAgent = window.navigator.userAgent;

            if (feedback) {
                firebaseMainService.addFeedback(name, feedback, userAgent, screenWidth, screenHeight, article).then(function() {
                    $scope.hasSend = true;
                });
            }
        };

    }
})();
