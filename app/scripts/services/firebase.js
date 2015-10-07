/* globals Firebase */
'use strict';

/**
 * @ngdoc service
 * @name immersiveAngularApp.firebase
 * @description
 * # firebase
 * Service in the immersiveAngularApp.
 */
angular.module('immersiveAngularApp')
    .factory('FBArticle', ['$firebaseArray', '$firebaseObject', '$q', function($firebaseArray, $firebaseObject, $q) {



        /*
            All functions available in the FBArticle Service
        */
        return {


            /*
                Load an article
            */

            get: function(articleId, FURL) {
                var deferred = $q.defer();
                var ref = new Firebase(FURL).child('articles/' + articleId);
                var obj = $firebaseObject(ref);
                obj.$loaded().then(function() {
                    deferred.resolve(obj);
                });
                return deferred.promise;
            },

            add: function(articleId, FURL, type, parameters) {
                var deferred = $q.defer();
                var ref = new Firebase(FURL).child('articles/' + articleId + '/blocks/');
                var list = $firebaseArray(ref);
                list.$add({
                    'type': type,
                    'parameters': parameters
                }).then(function(ref) {
                    var id = ref.key();
                    deferred.resolve(ref, id);
                });
                return deferred.promise;
            },


            delete: function(articleId, FURL, key) {
                var deferred = $q.defer();
                var ref = new Firebase(FURL).child('articles/' + articleId + '/blocks/' + key);
                var obj = $firebaseObject(ref);
                obj.$remove().then(function(ref) {
                    deferred.resolve(ref);
                }, function(err) {

                    console.log("Error:", err);
                    deferred.reject(err);

                });
                return deferred.promise;
            },



            list: function(articleId, FURL) {
                var url = FURL + '/articles/' + articleId + '/blocks/';
                var list = $firebaseArray(new Firebase(url));
                return list
            },


            setPriority: function(articleId, FURL, key, priority) {
                console.log('Setting priority ' + priority + ' for ' + key);
                var ref = new Firebase(FURL).child('articles/' + articleId + '/blocks/' + key);
                ref.setPriority(priority);
                ref.child('order').set(priority);
            },
        };
    }]);
