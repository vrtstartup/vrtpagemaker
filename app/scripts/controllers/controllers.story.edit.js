'use strict';

angular.module('immersiveAngularApp')
    .controller('StoryEditController', function($scope, $routeParams, firebaseStoryService, firebaseBlocksService, firebaseStoriesService, $window, $mdDialog, valuesService, $timeout, $mdSidenav, $mdUtil, $log, $location) {

        /*
            values used in page
        */

        /* id of the article */
        $scope.articleId = $routeParams.article;

        /* All the "new block"-buttons */
        $scope.buttons = valuesService.buttons();



        /*
            functions used inside controller, alphabetically
        */

        /* Get  the article from the Firebase */
        function getArticle() {
            /*  Get meta of the article */
            firebaseStoryService.getMeta($scope.articleId).then(function(obj) {
                obj.$bindTo($scope, "articleMeta");

                /*  Get the array of blocks */
                firebaseStoryService.getBlocks($scope.articleId).then(function(list) {
                    $scope.list = list;
                });
            });

        }

        function reorderList() {
            var arrayLength = $scope.list.length;
            for (var i = 0; i < arrayLength; i++) {
                firebaseStoryService.setPriority($scope.articleId, $scope.list[i].$id, i);
            }
        }

        /* Show the dialog */
        function showDialog(template, type, id, $event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: template,
                clickOutsideToClose: true,
                locals: {
                    id: id,
                    article: $scope.articleId,
                    type: type
                },
                controller: 'storyDialogController'
            });
        }



        /* Listeners for dragging */
        $scope.dragControlListeners = {
            itemMoved: function() {},
            orderChanged: function() {
                reorderList();
            }
        };


        /*
            UI Actions
        */

        /* Back to overview of articles */
        $scope.goHome = function() {
            $location.path('/edit/');

        };

        /* Go to the live page */
        $scope.goToLive = function(articleId) {
            window.open('/#/articles/' + articleId, '_blank');
            // $location.path('/articles/' + articleId);
        };


        /* When mouses enters a block, the block in the article gets highlighted. When mouse leaves, reset */
        $scope.setActiveBlock = function(block) {
            $scope.activeBlock = block;
        };
        $scope.removeActiveBlock = function() {
            $scope.activeBlock = '';
        };


        /* Starts the opening of the dialog.*/
        $scope.openDialog = function(article, type, id) {
            console.log('dialog controller says: You want me to open the dialog for an object type "' + type + '" of article ' + article);
            valuesService.dialogs(type).then(function(template) {
                showDialog(template, type, id);
            });
        };

        /*  Toggle the menu */
        $scope.toggleMenuWidth = function() {
            if ($scope.menuWidth === 20) {
                $scope.menuWidth = 5;
            } else {
                $scope.menuWidth = 20;
            }
        };

        /*
            Changes to the article
        */

        /*  Add the article to the Live */
        $scope.addToLive = function(articleId) {
            firebaseStoryService.live(articleId).then(function() {
                var arrayLength = $scope.list.length;
                for (var i = 0; i < arrayLength; i++) {
                    firebaseStoryService.setPriorityLive($scope.articleId, $scope.list[i].$id, i);
                }
            });
        };


        /* Toggle Live */
        $scope.changeLive = function(articleId, live) {
            console.log('clicked');
            if (live !== true) {
                firebaseStoryService.deleteLive(articleId);
            } else {
                $scope.addToLive(articleId);
            }
        };

        /* Delete the article completely */
        $scope.deleteArticle = function(articleId) {
            firebaseStoriesService.delete(articleId, 'live').then(function() {
                firebaseStoriesService.delete(articleId, 'staging').then(function() {
                    console.log('deleted everything');
                    $location.path('/edit/');

                });
            });
        };

        /*
            In the beginning, there was the article.
        */
        getArticle();


        // TODO: $on.destroy > stop audio
    });
