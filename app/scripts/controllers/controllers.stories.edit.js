'use strict';

angular.module('immersiveAngularApp')
    .controller('StoriesEditController', function($scope, $mdDialog, firebaseStoriesService, $location) {


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
