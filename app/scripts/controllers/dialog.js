'use strict';

angular.module('immersiveAngularApp')
    .controller('DialogController', function($scope, $window, $mdDialog, id, article, type, FBArticle, FBBlock, blocks, blocksValues, uploader) {



        $scope.article = article;
        $scope.filters = blocksValues.filters();
        $scope.templates = {
            'style': '../views/templates.dialog.style.html',
            'filters': '../views/templates.dialog.filters.html',
            'buttons': '../views/templates.dialog.buttons.html'
        };

        /* Add a new block */
        $scope.addBlock = function(block) {
            console.log(block);
            console.log('dialog controller says: You want me to add a block of type "' + block.type + '" to article ' + $scope.article);
            $scope.changeStyle($scope.size);
            blocks.add($scope.article, block).then(function() {
                $scope.closeDialog();
            });
        };

        /* When changing the width of the block, this function is called */
        $scope.changeStyle = function(style) {
            console.log('test');
            var s = blocksValues.styles(style);
            $scope.block.parameters.width = s.width;
        };

        /* Close the dialog */
        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

        /* Delete this block */
        $scope.deleteBlock = function(key) {
            blocks.delete($scope.article, key).then(function() {
                $scope.closeDialog();
            });
        };

        $scope.getFile = function(type) {
            console.log('getting file of ' + type);
            uploader.uploadFile(type).then(function(Blob) {
                if ($scope.block) {
                    $scope.block.parameters.url = Blob.url;
                } else {
                    $scope.block = {
                        parameters: {
                            url: Blob.url
                        }
                    };
                }
            });
        };

        /* Function to populate the created dialog, depending on id of the block */
        var populateDialog = function() {
            /* There is and id already, so we are editing this */
            if (id) {
                /* Load the object from the Firebase */
                FBBlock.getObject($scope.article, id).then(function(obj) {
                    obj.$bindTo($scope, "block").then(function() {
                        $scope.size = obj.parameters.width;
                    });
                });
            }

            /* There is no id, so we are not editing, but creating */
            else {
                $scope.block = {
                    'type': type,
                    'parameters': {
                        'width': '50',
                    }
                };
                $scope.size = '50';
            }

        };

        // Start
        if (type && $scope.article) {
            populateDialog();
        }
    });
