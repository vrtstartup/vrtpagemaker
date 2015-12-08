'use strict';

angular.module('immersiveAngularApp')
    .controller('StoryViewController', function($scope, $routeParams, $css, firebaseStoryService) {
        /* Set the id of the article */
        $scope.articleId = $routeParams.article;

        /* Get  the article from the Firebase */
        function getArticle() {
            firebaseStoryService.getLiveArticle($scope.articleId).then(function(list) {
                $scope.list = list.blocks;
                $css.add('styles/' + list.meta.brandname + '.css');
            });
        }

        getArticle();


    });
