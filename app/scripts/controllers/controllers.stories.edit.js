'use strict';

angular.module('immersiveAngularApp')
    .controller('StoriesEditController', function($scope, $mdDialog, firebaseStoriesService, firebaseStoryService, $location, Auth) {


        $scope.auth = Auth;

        $scope.auth.$onAuth(function(authData) {
            if (authData === null) {
                console.log("Not logged in yet");

            } else {
                console.log("Logged in as", authData.uid);

            }
            $scope.authData = authData;

        });





        $scope.logout = function() {
            Auth.$unauth();
        };

        /* Get  the article from the Firebase */
        function getArticles(place) {

            /*  Get the array of blocks */
            firebaseStoriesService.getArray(place).then(function(list) {
                $scope.list = list;
            });
        }


        $scope.editArticle = function(article) {
            $location.path('/edit/' + article);

        };


        $scope.changeLive = function(articleId, live) {
            if (live !== true) {
                firebaseStoryService.deleteLive(articleId, 'live');
            } else {
                firebaseStoryService.live(articleId).then(function(obj) {
                    console.log(obj);
                });
            }
        };

        $scope.removeArticle = function(article) {
            console.log(article);
            firebaseStoriesService.delete(article, 'staging');
            firebaseStoriesService.delete(article, 'live');
        };

        /* Show the dialog */
        function showDialog($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: 'views/templates.dialog.story.new.html',
                clickOutsideToClose: true,
                scope: $scope
            });
        }

        $scope.startStory = function(edit) {
            showDialog(edit);
        };

        /* Close the dialog */
        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

        $scope.createStory = function(title) {
            if ($scope.authData === null) {
                console.log("Not logged in yet");


            } else {
                console.log("Logged in as", $scope.authData.uid);
                firebaseStoriesService.add(title, $scope.authData.uid).then(function(id) {
                    console.log(id);
                    console.log($location);
                    $location.path('/edit/' + id);
                });

            }

        };


        getArticles('staging');


    });
