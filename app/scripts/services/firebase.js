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



    var FURLStaging = 'https://immersiveangular.firebaseio.com/staging/';

    /*
        All functions available in the FBArticle Service
    */
    return {


        /*
            Load an article
        */


        getArray: function(articleId) {
            var deferred = $q.defer();
            var url = FURLStaging + '/articles/' + articleId + '/blocks/';
            var list = $firebaseArray(new Firebase(url).orderByPriority());
            list.$loaded()
                .then(function(x) {
                    deferred.resolve(x);
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });
            return deferred.promise;
        },



        add: function(articleId, block, priority) {
            console.log('adding ' + block + ' to article ' + articleId);
            console.log(block);
            var deferred = $q.defer();
            var ref = new Firebase(FURLStaging).child('articles/' + articleId + '/blocks/');
            var list = $firebaseArray(ref);
            list.$add({
                'type': block.type,
                'parameters': block.parameters
            }).then(function(ref) {
                var id = ref.key();

                deferred.resolve(id);
            });
            return deferred.promise;
        },



        delete: function(articleId, key) {
            console.log('deleting ' + key + ' from article ' + articleId);
            var deferred = $q.defer();
            var list = $firebaseArray(new Firebase(FURLStaging).child('articles/' + articleId + '/blocks/'));
            list.$loaded()
                .then(function(article) {
                    console.log(article[key]);
                    var item = article[key];
                    list.$remove(item).then(function(ref) {
                        // ref.key() === item.$id; // true
                        deferred.resolve(ref);
                    });
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });
            return deferred.promise;
        },

        queryFrom: function(articleId, key) {
            var deferred = $q.defer();
            var url = FURLStaging + '/articles/' + articleId + '/blocks/';
            var start = key++;
            var list = $firebaseArray(new Firebase(url).orderByPriority().startAt(start));
            list.$loaded()
                .then(function(x) {
                    deferred.resolve(x);
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });
            return deferred.promise;
        },

        setPriority: function(articleId, key, priority) {
            var ref = new Firebase(FURLStaging).child('articles/' + articleId + '/blocks/' + key);
            ref.setPriority(priority);
            ref.child('order').set(priority);
        },

        countObjects: function(articleId) {
            var deferred = $q.defer();
            var ref = new Firebase(FURLStaging).child('articles/' + articleId + '/blocks/');
            var firebaseObj = $firebaseObject(ref);
            firebaseObj.$loaded().then(function() {
                /* Do not count the keys that are always in Firebase */
                var count = -3;

                for (var key in firebaseObj) {
                    if (firebaseObj.hasOwnProperty(key)) {
                        ++count;
                    }
                }
                deferred.resolve(count);
            }, function(err) {
                console.log('The article did not load from Firebase, this was your error: ' + err);
                deferred.reject(err);
            });
            return deferred.promise;
        },


    };
}])


.factory('FBBlock', ['$firebaseObject', '$q', function($firebaseObject, $q) {
    var FURLStaging = 'https://immersiveangular.firebaseio.com/staging/';


    /*
        All functions available in the FBBlock Service
    */
    return {

        /*
            Load a Block
        */
        getObject: function(articleId, objectId) {
            var deferred = $q.defer();
            var ref = new Firebase(FURLStaging).child('articles/' + articleId + '/blocks/' + objectId);
            var obj = $firebaseObject(ref);
            obj.$loaded().then(function() {
                deferred.resolve(obj);
            });
            return deferred.promise;
        },



    };
}]);
