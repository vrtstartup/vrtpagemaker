'use strict';

angular.module('immersiveAngularApp')
    .controller('ArticleViewCtrl', function($scope, $routeParams, FBArticle) {
        /* Set the id of the article */
        $scope.articleId = $routeParams.article;

        /* Get  the article from the Firebase */
        function getArticle() {
            FBArticle.getLiveArticle($scope.articleId).then(function(list) {
                $scope.list = list.blocks;
                console.log(list);
            });
        }

        getArticle();


    });
