'use strict';

angular.module('immersiveAngularApp')
    .controller('MainController', function($scope, firebaseUserService, $location) {

        $scope.logIn = function(user) {
            firebaseUserService.logIn(user).then(function(response) {
                console.log(response);
                if (response.uid) {
                    $location.path('/edit/');
                }
            });
        };
    });
