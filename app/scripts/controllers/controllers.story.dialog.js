'use strict';

angular.module('immersiveAngularApp')
    .controller('storyDialogController', function($scope, $window, $mdDialog, $location, id, article, type, firebaseStoriesService, firebaseStoryService, firebaseBlocksService, valuesService, templatesService, toolsUploaderService, toolsUrlprocessing) {

        $scope.article = article;
        $scope.filters = valuesService.filters();
        $scope.brands = templatesService.brands();

        /* Add a new block */
        $scope.addBlock = function(block) {
            firebaseBlocksService.add($scope.article, block).then(function() {
                $scope.closeDialog();
            });
        };

        /* When changing the brand, this function is called */
        $scope.changeBrand = function(brand) {

            templatesService.getBrand(brand).then(function(b) {
                $scope.meta.brand = b.name;
            });
        };


        /* When changing the width of the block, this function is called */
        $scope.changeStyle = function(style) {
            var s = valuesService.styles(style);
            $scope.block.parameters.width = s.width;
        };

        /* Close the dialog */
        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

        /* Delete this block */
        $scope.deleteBlock = function() {
            firebaseBlocksService.delete($scope.article, id).then(function() {
                $scope.closeDialog();
            });
        };


        $scope.processIframe = function(url) {
            toolsUrlprocessing.processIframe(url).then(function() {
                $scope.block.parameters.code = url;
            });

        };

        $scope.processVideo = function(url) {
            if (url) {
                toolsUrlprocessing.processVideo(url).then(function(response) {
                    console.log(response.url, response.host);
                    $scope.block.parameters.url = response.url;
                    $scope.block.parameters.host = response.host;
                });
            }
        };


        $scope.getFile = function(type) {
            toolsUploaderService.uploadFile(type).then(function(Blob) {
                if ($scope.block) {
                    $scope.block.parameters.url = Blob.url;
                    $scope.block.parameters.mimetype = Blob.mimetype;
                } else {
                    $scope.block = {
                        parameters: {
                            url: Blob.url
                        }
                    };
                }
            });
        };


        $scope.getMetaImage = function(type) {
            toolsUploaderService.uploadFile(type).then(function(Blob) {
                console.log(Blob);
                if ($scope.meta) {
                    $scope.meta.headerImage = Blob.url;

                }
            });
        };




        $scope.getMetaVideo = function(type) {
            toolsUploaderService.uploadFile(type).then(function(Blob) {
                console.log(Blob);
                if ($scope.meta) {
                    $scope.meta.video = {
                        url: Blob.url,
                        mimetype: Blob.mimetype
                    };

                }
            });
        };



        $scope.getFiles = function(type) {
            toolsUploaderService.uploadMultiple(type).then(function(Blobs) {
                if ($scope.block) {
                    $scope.block.parameters.images = [];
                } else {
                    $scope.block = {
                        parameters: {
                            images: []
                        }
                    };
                }

                Blobs.forEach(function(Blob) {
                    $scope.block.parameters.images.push(Blob.url);
                });
            });
        };

        /* Save the meta info of a story */
        var getMeta = function() {
            firebaseStoryService.getMeta($scope.article).then(function(obj) {
                obj.$bindTo($scope, "meta").then(function() {
                    if ($scope.meta.brand) {
                        $scope.brand = $scope.meta.brand;
                    }
                });
            });
        };

        /* Function to populate the created dialog, depending on id of the block */
        var populateDialog = function() {
            /* There is and id already, so we are editing this */
            if (id) {
                $scope.editing = true;

                /* Load the object from the Firebase */
                firebaseBlocksService.getObject($scope.article, id).then(function(obj) {
                    obj.$bindTo($scope, "block").then(function() {
                        $scope.size = obj.parameters.width;
                    });
                });
            }

            /* There is no id, so we are not editing, but creating */
            else {

                $scope.editing = false;

                $scope.block = {
                    'type': type,
                    'parameters': {
                        'width': '50',
                    }
                };
                $scope.size = '50';
            }
        };


        /* Delete the article, actually moving it to another branch in the Firebase */
        $scope.deleteArticle = function() {

            firebaseStoriesService.delete($scope.article, 'live').then(function() {
                firebaseStoriesService.delete($scope.article, 'staging').then(function() {
                    $location.path('/edit/');
                });
            });
        };



        // Start
        if (type && type !== 'meta' && type !== 'header' && type !== 'delete' && $scope.article) {
            populateDialog();
        } else if (type === 'meta' || type === 'header') {
            getMeta();
        } else {
            console.log('do nothing');
        }

    });
