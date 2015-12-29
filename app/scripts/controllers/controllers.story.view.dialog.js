'use strict';

angular.module('immersiveAngularApp')
    .controller('storyViewDialogController', function($scope, $window, $mdDialog) {


        console.log('test');

        /* Close the dialog */
        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

    });
