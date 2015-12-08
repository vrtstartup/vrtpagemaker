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
            template: '<div class="o-feedback" ng-click="showDialog()"><md-tooltip>Een idee of een tip?</md-tooltip><svg id="feedbackButton" enable-background="new 0 0 64 64"  id="Layer_1" version="1.1" viewBox="0 0 64 64"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M47.964,8.127H16.036c-4.4,0-8,3.6-8,8v20.977c0,4.4,3.6,8,8,8h7.397v10.768l13.333-10.768h11.197c4.4,0,8-3.6,8-8V16.127   C55.964,11.727,52.364,8.127,47.964,8.127z M50.964,37.104c0,1.626-1.374,3-3,3H36.767H35l-1.375,1.11l-5.191,4.193v-0.303v-5h-5   h-7.397c-1.626,0-3-1.374-3-3V16.127c0-1.626,1.374-3,3-3h31.928c1.626,0,3,1.374,3,3V37.104z"/><circle cx="21.743" cy="26.617" r="2.913"/><circle cx="32" cy="26.617" r="2.913"/><circle cx="42.256" cy="26.617" r="2.913"/></g></svg></div>',
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
