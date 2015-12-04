'use strict';

angular.module('immersiveAngularApp')
    .controller('storyDialogController', function($scope, $window, $mdDialog, id, article, type, firebaseStoryService, firebaseBlocksService, valuesService, toolsUploaderService) {

        $scope.article = article;
        $scope.filters = valuesService.filters();
        $scope.templates = {
            'style': '../views/includes.dialog.style.html',
            'filters': '../views/includes.dialog.filters.html',
            'buttons': '../views/includes.dialog.buttons.html'
        };

        /* Add a new block */
        $scope.addBlock = function(block) {
            $scope.changeStyle($scope.size);
            firebaseBlocksService.add($scope.article, block).then(function() {
                $scope.closeDialog();
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
        $scope.deleteBlock = function(key) {
            firebaseBlocksService.delete($scope.article, key).then(function() {
                $scope.closeDialog();
            });
        };

        $scope.getFile = function(type) {
            toolsUploaderService.uploadFile(type).then(function(Blob) {
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
                firebaseBlocksService.getObject($scope.article, id).then(function(obj) {
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
