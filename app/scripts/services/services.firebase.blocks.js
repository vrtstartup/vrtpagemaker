'use strict';

angular.module('immersiveAngularApp')
    .factory('firebaseBlocksService', ['$q', 'firebaseStoryService', 'firebaseURL', '$firebaseObject', function($q, firebaseStoryService, firebaseURL, $firebaseObject) {



        var FURLStaging = firebaseURL.FURLStaging;


        return {
            add: function(articleId, object) {
                console.log('blocks service says: You want me to add a block of type "' + object.type + '" to article ' + articleId);
                var deferred = $q.defer();
                firebaseStoryService.countObjects(articleId).then(function(count) {
                    console.log(count);
                    firebaseStoryService.add(articleId, object).then(function(id) {
                        var priority = count;
                        firebaseStoryService.setPriority(articleId, id, priority);
                        deferred.resolve(id);

                    });
                });
                return deferred.promise;
            },

            delete: function(articleId, key) {
                console.log('blocks service says: You want me to delete an object with key ' + key + 'from article ' + articleId);
                var deferred = $q.defer();
                firebaseStoryService.delete(articleId, key).then(function(ref) {
                    console.log('deleted ' + ref);
                    deferred.resolve(ref);
                });
                return deferred.promise;
            },

            /*
            Load a Block
            */

            getObject: function(articleId, objectId) {
                var deferred = $q.defer();
                console.log(articleId, objectId);
                var ref = new Firebase(FURLStaging).child('articles/' + articleId + '/blocks/' + objectId);
                var obj = $firebaseObject(ref);
                obj.$loaded().then(function() {
                    deferred.resolve(obj);
                });
                return deferred.promise;
            },


        };
    }]);
