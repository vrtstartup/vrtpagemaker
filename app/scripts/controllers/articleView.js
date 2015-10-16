'use strict';

/**
 * @ngdoc function
 * @name immersiveAngularApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the immersiveAngularApp
 */
angular.module('immersiveAngularApp')
    .controller('ArticleViewCtrl', function($scope, $routeParams, FBArticle) {
        /* Set the id of the article */
        $scope.articleId = $routeParams.article;

        /* Get  the article from the Firebase */
        function getArticle() {
            FBArticle.getArray($scope.articleId).then(function(list) {
                $scope.list = list;
            });
        }

        getArticle();


    });
