'use strict';

angular.module('immersiveAngularApp')
    .controller('StoryEditController', function($scope, $routeParams, firebaseStoryService, firebaseBlocksService, firebaseStoriesService, $window, $mdDialog, valuesService, $timeout, $mdSidenav, $mdUtil, $log, $location) {

        /* Set the id of the article */
        $scope.articleId = $routeParams.article;

        /* Get  the article from the Firebase */
        function getArticle() {

            /*  Get the array of blocks */
            firebaseStoryService.getArray($scope.articleId).then(function(list) {
                $scope.list = list;
            });

            /*  Get meta of the article */
            firebaseStoryService.getArticle($scope.articleId).then(function(obj) {
                console.log(obj);
                obj.$bindTo($scope, "articleMeta");
            });

        }

        $scope.goHome = function() {
            $location.path('/edit/');

        };


        $scope.changeLive = function(articleId, live) {
            console.log(articleId);
            if (live !== true) {
                firebaseStoryService.deleteLive(articleId, 'live');
            } else {
                firebaseStoryService.live(articleId).then(function() {

                });
            }
        };



        $scope.addToLive = function(articleId) {
            /* Get Article */
            firebaseStoryService.getArticle($scope.articleId).then(function(obj) {
                console.log(obj);
                /* Save article to Live*/
                firebaseStoryService.live(articleId, obj).then(function(obj) {
                    console.log(obj);
                });
            });
        };


        // $scope.removeFromLive = function(articleId) {
        //     firebaseStoryService.deleteLive(articleId, 'live');
        // };

        $scope.setActiveBlock = function(block) {
            $scope.activeBlock = block;
        };

        $scope.removeActiveBlock = function(block) {
            $scope.activeBlock = '';
        };

        $scope.toggleMenuWidth = function() {
            if ($scope.menuWidth === 20) {
                $scope.menuWidth = 5;
            } else {
                $scope.menuWidth = 20;
            }
        };


        $scope.goToLive = function(articleId) {
            $location.path('/articles/' + articleId);
        };

        $scope.deleteArticle = function(articleId) {
            firebaseStoriesService.delete(articleId, 'live').then(function() {
                firebaseStoriesService.delete(articleId, 'staging').then(function() {
                    console.log('deleted everything');
                    $location.path('/edit/');

                });
            });

        };

        var updatePriority = function(article, id) {
            firebaseBlocksService.getObject(article, id)
                .then(function(obj) {
                    var newPriority = obj.$priority++;
                    firebaseStoryService.setPriority($scope.articleId, obj.priorityid, newPriority);
                });
        };


        /* Loop through articles and set Priority accordingly  Should Go To Service*/
        function reorderList(startAt, inBetween) {
            console.log('ik wil door de lijst gaan en starten bij ' + startAt + ' en de priority zetten.');
            var arrayLength = $scope.list.length;
            for (var i = startAt; i < arrayLength; i++) {
                if (inBetween) {
                    updatePriority($scope.articleId, $scope.list[i].$id);
                } else {
                    console.log('reordering');
                    firebaseStoryService.setPriority($scope.articleId, $scope.list[i].$id, i);

                }

                // console.log('de priority voor ' + i + ' = ' + priority);
                // firebaseStoryService.setPriority($scope.articleId, $scope.list[i].$id);

            }
        }

        /* All the "new block"-buttons*/
        $scope.buttons = valuesService.buttons();

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
            itemMoved: function(event) {
                console.log(event);
            },
            orderChanged: function(event) {
                console.log(event);
                reorderList(0, false);
            }
        };

        /* addBlock when called from text block */
        $scope.addBlock = function(article, edit) {
            firebaseBlocksService.add(article, edit).then(function(id) {
                console.log(id);
            });
        };

        /* Starts the opening of the dialog. Is called from the Edit button in the view */
        $scope.openDialog = function(article, type, id) {
            console.log('dialog controller says: You want me to open the dialog for an object type "' + type + '" of article ' + article);
            valuesService.dialogs(type).then(function(template) {
                showDialog(template, type, id);
            });
        };


        /* In the beginning, there was the article. */
        getArticle();


        // TODO: $on.destroy > stop audio
    });
