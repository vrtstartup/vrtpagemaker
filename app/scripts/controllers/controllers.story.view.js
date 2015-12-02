'use strict';

angular.module('immersiveAngularApp')
    .controller('StoryViewController', function($scope, $routeParams, firebaseStoryService) {
        /* Set the id of the article */
        $scope.articleId = $routeParams.article;

        /* Get  the article from the Firebase */
        function getArticle() {
            firebaseStoryService.getLiveArticle($scope.articleId).then(function(list) {
                $scope.list = list.blocks;
                console.log(list);
            });
        }

        getArticle();


    });
