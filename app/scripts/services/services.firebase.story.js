/* globals Firebase */
'use strict';

angular.module('immersiveAngularApp')

.factory('firebaseStoryService', ['$firebaseArray', '$firebaseObject', '$q', 'firebaseURL', function($firebaseArray, $firebaseObject, $q, firebaseURL) {



    var FURLStaging = firebaseURL.FURLStaging;
    var FURLLive = firebaseURL.FURLLive;


    return {

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


        getArticle: function(articleId) {
            var deferred = $q.defer();

            var ref = new Firebase(FURLStaging).child('articles/' + articleId);
            var firebaseObj = $firebaseObject(ref);
            firebaseObj.$loaded().then(function(obj) {
                deferred.resolve(obj);
            }, function(err) {
                console.log('The article did not load from Firebase, this was your error: ' + err);
                deferred.reject(err);
            });
            return deferred.promise;
        },



        getLiveArticle: function(articleId) {
            var deferred = $q.defer();

            var ref = new Firebase(FURLLive).child('articles/' + articleId);
            var firebaseObj = $firebaseObject(ref);
            firebaseObj.$loaded().then(function(obj) {
                deferred.resolve(obj);

            }, function(err) {
                console.log('The article did not load from Firebase, this was your error: ' + err);
                deferred.reject(err);
            });
            return deferred.promise;
        },






        add: function(articleId, block) {
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



        getMeta: function(articleId) {
            var deferred = $q.defer();
            var ref = new Firebase(FURLStaging).child('articles/' + articleId + '/meta/');
            var obj = $firebaseObject(ref);
            obj.$loaded().then(function() {
                deferred.resolve(obj);
            });
            return deferred.promise;
        },


        live: function(articleId, article) {
            console.log(article);
            console.log('pushing ' + articleId + ' to live');
            var deferred = $q.defer();
            var ref = new Firebase(FURLLive).child('articles/' + articleId);
            var obj = $firebaseObject(ref);
            console.log(obj);

            obj.title = article.title;
            obj.createdAt = article.createdAt;
            obj.updatedAt = Firebase.ServerValue.TIMESTAMP;
            obj.blocks = article.blocks;
            obj.live = true;


            obj.$save().then(function() {
                deferred.resolve(obj);
            }, function(error) {
                console.log("Error:", error);
                deferred.reject(error);
            });
            return deferred.promise;
        },


        delete: function(articleId, id) {

            var deferred = $q.defer();
            var obj = $firebaseObject(new Firebase(FURLStaging).child('articles/' + articleId + '/blocks/' + id));
            obj.$loaded()
                .then(function() {

                    obj.$remove().then(function(ref) {
                        deferred.resolve(ref);
                    }, function(error) {
                        console.log("Error:", error);
                    });
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });
            return deferred.promise;
        },


        deleteLive: function(articleId) {
            console.log(articleId);
            var deferred = $q.defer();

            var ref = new Firebase(FURLLive).child('articles/' + articleId);
            var obj = $firebaseObject(ref);
            obj.$remove().then(function(ref) {
                deferred.resolve(ref);
                // data has been deleted locally and in the database
            }, function(error) {
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
                    deferred.reject(error);
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
}]);
