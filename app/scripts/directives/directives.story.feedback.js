'use strict';

function FeedbackController(scope, $window, $mdDialog, firebaseMainService, article) {

    scope.closeDialog = function() {
        $mdDialog.cancel();
    };

    scope.addFeedback = function(name, feedback) {

        var screenHeight = $window.innerHeight;
        var screenWidth = $window.innerWidth;
        var userAgent = window.navigator.userAgent;

        if (feedback) {
            firebaseMainService.addFeedback(name, feedback, userAgent, screenWidth, screenHeight, article).then(function() {
                scope.hasSend = true;
            });
        }
    };

}

angular.module('immersiveAngularApp')
    .directive('feedback', function($mdDialog) {
        return {
            template: '<div class="o-feedback"><md-button ng-click="showDialog()" class="md-raised md-primary">Feedback</md-button></div>',
            restrict: 'E',
            scope: {
                article: '='
            },
            link: function postLink(scope) {


                function showDialog($event) {
                    var parentEl = angular.element(document.body);
                    $mdDialog.show({
                        parent: parentEl,
                        targetEvent: $event,
                        templateUrl: 'views/templates.dialog.story.feedback.html',
                        clickOutsideToClose: true,
                        locals: {
                            article: scope.article
                        },
                        controller: FeedbackController
                    });
                }

                scope.showDialog = function() {
                    showDialog();
                };


            }
        };
    });
