'use strict';

angular.module('immersiveAngularApp')
    .controller('StoryViewController', function($scope, $routeParams, $css, firebaseStoryService) {

        $scope.loading = true;

        /* Set the id of the article */
        $scope.articleId = $routeParams.article;

        /* Get  the article from the Firebase */
        function getArticle() {
            firebaseStoryService.getLiveMeta($scope.articleId).then(function(meta) {
                $scope.meta = meta;
                // $css.add('styles/' + $scope.meta.brandname + '.css');
                firebaseStoryService.getLiveBlocks($scope.articleId).then(function(blocks) {
                    $scope.blocks = blocks;
                    $scope.loading = false;
                });
            });
        }

        getArticle();

    });
