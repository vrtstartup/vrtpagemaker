/* globals Firebase */
'use strict';

angular.module('immersiveAngularApp')

.factory('firebaseUserService', ['$firebaseArray', '$firebaseObject', '$q', 'firebaseURL', function($firebaseArray, $firebaseObject, $q, firebaseURL) {



    var FURL = firebaseURL.FURL;


    return {


        logIn: function(user) {
            var deferred = $q.defer();

            var ref = new Firebase(FURL);
            ref.authWithPassword({
                email: user.mail,
                password: user.password
            }, function(error, authData) {
                if (error) {
                    deferred.resolve(error);
                } else {
                    deferred.resolve(authData);
                }
            });
            return deferred.promise;
        }

    };
}]);
