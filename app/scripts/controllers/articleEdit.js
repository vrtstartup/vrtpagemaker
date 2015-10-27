'use strict';

/**
 * @ngdoc function
 * @name immersiveAngularApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the immersiveAngularApp
 */



function DialogController($scope, $window, $mdDialog, filepickerService, id, article, type, FBArticle, FBBlock, blocks) {


    $scope.id = id;
    $scope.type = type;
    $scope.articleId = article;


    /* There is and id already, so we are editing this */
    if ($scope.id) {
        console.log('dialog controller says: You want me to edit ' + $scope.id + ' of type "' + $scope.type + '" in article ' + $scope.articleId);
        /* Load the object from the Firebase */
        FBBlock.getObject($scope.articleId, id).then(function(obj) {
            obj.$bindTo($scope, "block");
        });
    }

    /* There is no id, so we are not editing, but creating */
    else {
        console.log('dialog controller says: You want me to create an object of type "' + $scope.type + '" in article ' + $scope.articleId);
        /* The only thing we know is the type of the dialog. */
        $scope.block = {
            'type': type
        };
    }

    $scope.size = 'normal';
    // $scope.block.parameters.width = 50;
    // $scope.block.parameters.offset = 25;

    $scope.changeStyle = function(style) {
        switch (style) {
            case 'small':
                $scope.block.parameters.width = 33;
                $scope.block.parameters.offset = 33;
                break;
            case 'smallGrid':
                $scope.block.parameters.width = 33;
                $scope.block.parameters.offset = 0;
                break;
            case 'normal':
                $scope.block.parameters.width = 50;
                $scope.block.parameters.offset = 25;
                break;

            case 'wide':
                $scope.block.parameters.width = 80;
                $scope.block.parameters.offset = 10;
                break;

            case 'full':
                $scope.block.parameters.width = 100;
                $scope.block.parameters.offset = 0;
                break;

            default:
                console.log('This width does not exist');
        }


    };


    $scope.addBlock = function(articleId, block) {
        console.log('dialog controller says: You want me to add a block of type "' + block.type + '" to article ' + articleId);

        $scope.changeStyle($scope.size);

        blocks.add(articleId, block).then(function() {
            $scope.closeDialog();
        });
    };

    $scope.deleteBlock = function(article, key) {
        blocks.delete(article, key).then(function() {
            $scope.closeDialog();
        });
    };

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };


    /* Functions for the filepicker. Should Go To Service */
    $scope.files = JSON.parse($window.localStorage.getItem('files') || '[]');

    function onSuccess(Blob) {
        console.log('got the file');
        $scope.files.push(Blob);
        $window.localStorage.setItem('files', JSON.stringify($scope.files));
        console.log(Blob);
        $scope.block.parameters = {
            'url': Blob.url,
            'client': Blob.url
        };
    }

    $scope.pickFile = function(type) {
        console.log('picking file of type ' + type);
        console.log(filepickerService);
        filepickerService.pick({
                mimetype: type,
                Language: 'nl'
            },
            onSuccess
        );
    };
    $scope.onSuccess = onSuccess;

}


angular.module('immersiveAngularApp')
    .controller('ArticleEditCtrl', function($scope, $routeParams, FBArticle, FBBlock, FBStory, $window, $mdDialog, blocks, templates, $timeout, $mdSidenav, $mdUtil, $log, $location) {

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
        $scope.templates = [{
            'type': 'text',
            'name': 'tekst'


        }, {
            'type': 'image',
            'name': 'afbeelding'

        }, {
            'type': 'video',
            'name': 'Video'

        }, {
            'type': 'iframe',
            'name': 'Embedcode'

        }];

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
                controller: DialogController
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
            templates.dialogTemplates(type).then(function(template) {
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
