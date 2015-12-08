'use strict';

angular.module('immersiveAngularApp')
    .controller('StoriesEditController', function($scope, $mdDialog, firebaseStoriesService, firebaseStoryService, $location) {

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
            console.log(live);
            if (live !== true) {
                console.log('deleting article ' + articleId + ' from live');
                firebaseStoryService.deleteLive(articleId, 'live');


            } else {

                /* Get Article */
                firebaseStoryService.getArticle($scope.articleId).then(function(obj) {
                    console.log(obj);
                    /* Save article to Live*/
                    firebaseStoryService.live(articleId).then(function(obj) {
                        console.log(obj);
                    });
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

        $scope.createStory = function(title) {
            firebaseStoriesService.add(title).then(function(id) {
                $location.path('/edit/' + id);
            });
        };


        getArticles('staging');


    });
