'use strict';

/**
 * @ngdoc service
 * @name immersiveAngularApp.blocks
 * @description
 * # blocks
 * Service in the immersiveAngularApp.
 */
angular.module('immersiveAngularApp')
    .factory('blocks', ['$q', 'FBArticle', function($q, FBArticle) {

        /*
            All functions available in the Blocks Service
        */
        return {

            add: function(articleId, object) {
                console.log('blocks service says: You want me to add a block of type "' + object.type + '" to article ' + articleId);
                var deferred = $q.defer();
                FBArticle.countObjects(articleId).then(function(count) {
                    console.log(count);
                    FBArticle.add(articleId, object).then(function(id) {
                        var priority = count;
                        FBArticle.setPriority(articleId, id, priority);
                        deferred.resolve(id);

                    });
                });
                return deferred.promise;
            },


            delete: function(articleId, key) {
                console.log('blocks service says: You want me to delete an object with key ' + key + 'from article ' + articleId);
                var deferred = $q.defer();
                FBArticle.delete(articleId, key).then(function(ref) {
                    console.log('deleted ' + ref);
                    deferred.resolve(ref);
                });
                return deferred.promise;


            }


        };
    }]);
