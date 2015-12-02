'use strict';

angular.module('immersiveAngularApp')
    .controller('ArticleEditCtrl', function($scope, $routeParams, FBArticle, FBBlock, FBStory, $window, $mdDialog, blocks, blocksValues, $timeout, $mdSidenav, $mdUtil, $log, $location) {

        /* Set the id of the article */
        $scope.articleId = $routeParams.article;

        /* Get  the article from the Firebase */
        function getArticle() {

            /*  Get the array of blocks */
            FBArticle.getArray($scope.articleId).then(function(list) {
                $scope.list = list;
            });

            /*  Get meta of the article */
            FBArticle.getArticle($scope.articleId).then(function(obj) {
                console.log(obj);
                obj.$bindTo($scope, "articleMeta");
            });

        }

        $scope.goHome = function() {
            $location.path('/edit/');

        };
        $scope.addToLive = function(articleId) {
            /* Get Article */
            FBArticle.getArticle($scope.articleId).then(function(obj) {
                console.log(obj);
                /* Save article to Live*/
                FBArticle.live(articleId, obj).then(function(obj) {
                    console.log(obj);
                });
            });
        };


        $scope.removeFromLive = function(articleId) {
            FBArticle.deleteLive(articleId, 'live');
        };

        $scope.goToLive = function(articleId) {
            $location.path('/articles/' + articleId);
        };

        $scope.deleteArticle = function(articleId) {
            FBStory.delete(articleId, 'live').then(function() {
                FBStory.delete(articleId, 'staging').then(function() {
                    console.log('deleted everything');
                    $location.path('/edit/');

                });
            });

        };

        var updatePriority = function(article, id) {
            FBBlock.getObject(article, id)
                .then(function(obj) {
                    var newPriority = obj.$priority++;
                    FBArticle.setPriority($scope.articleId, obj.priorityid, newPriority);
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
                    FBArticle.setPriority($scope.articleId, $scope.list[i].$id, i);

                }

                // console.log('de priority voor ' + i + ' = ' + priority);
                // FBArticle.setPriority($scope.articleId, $scope.list[i].$id);

            }
        }

        /* All the "new block"-buttons*/
        $scope.buttons = blocksValues.buttons();

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
                controller: 'DialogController'
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
            blocks.add(article, edit).then(function(id) {
                console.log(id);
            });
        };

        /* Starts the opening of the dialog. Is called from the Edit button in the view */
        $scope.openDialog = function(article, type, id) {
            console.log('dialog controller says: You want me to open the dialog for an object type "' + type + '" of article ' + article);
            blocksValues.dialogs(type).then(function(template) {
                showDialog(template, type, id);
            });
        };

        function buildToggler(navID) {
            var debounceFn = $mdUtil.debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
            return debounceFn;
        }

        /* Everything Menu Maybe create a directive? */
        $scope.toggleMenu = buildToggler('menu');

        $scope.isOpenLeft = function() {
            return $mdSidenav('menu').isOpen();
        };

        /* In the beginning, there was the article. */
        getArticle();

    });
