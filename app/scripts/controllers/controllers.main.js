/* globals Firebase */
'use strict';

angular.module('immersiveAngularApp')
    .controller('MainController', ['$scope', 'Auth', '$location',
        function($scope, Auth, $location) {

            $scope.auth = Auth;
            $scope.login = function() {
                var ref = new Firebase("https://immersivevrtstartup.firebaseio.com/");
                ref.authWithPassword({
                    email: $scope.user.mail,
                    password: $scope.user.password
                }, function(error, authData) {
                    if (error) {
                        console.log("Login Failed!", error);
                    } else {
                        console.log("Authenticated successfully with payload:", authData);
                        $location.path('/edit/');
                    }
                });
            };
            // any time auth status updates, add the user data to scope
            $scope.auth.$onAuth(function(authData) {
                $scope.authData = authData;
            });
        }
    ]);
