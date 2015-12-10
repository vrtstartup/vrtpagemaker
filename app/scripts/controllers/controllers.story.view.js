'use strict';

angular.module('immersiveAngularApp')
    .controller('StoryViewController', function($scope, $routeParams, $css, firebaseStoryService, audioPlayerService) {
        $scope.loading = true;
        /* Set the id of the article */
        $scope.articleId = $routeParams.article;

        /* Get  the article from the Firebase */
        function getArticle() {
            firebaseStoryService.getLiveArticle($scope.articleId).then(function(story) {
                console.log(story);
                $scope.meta = story.meta;
                $scope.blocks = story.blocks;
                $css.add('styles/' + story.meta.brandname + '.css');
                $scope.loading = false;
            });
        }

        getArticle();

        // TODO: $on.destroy > stop audio
    });
