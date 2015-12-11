/* globals Firebase */
'use strict';

angular.module('immersiveAngularApp')

.factory('firebaseStoriesService', ['$firebaseArray', '$firebaseObject', '$q', 'firebaseURL', function($firebaseArray, $firebaseObject, $q, firebaseURL) {



    var FURLStaging = firebaseURL.FURLStaging;
    var FURLLive = firebaseURL.FURLLive;

    return {

        add: function(title) {
            console.log('adding a story with title ' + title);
            var deferred = $q.defer();
            var ref = new Firebase(FURLStaging).child('articles/');
            var list = $firebaseArray(ref);
            list.$add({
                'meta': {
                    'createdAt': Firebase.ServerValue.TIMESTAMP,
                    'live': false,
                    'title': title
                }
            }).then(function(ref) {
                var id = ref.key();
                deferred.resolve(id);
            });
            return deferred.promise;
        },

        getArray: function(place) {
            var FURL;
            if (place === 'live') {
                FURL = FURLLive;
            } else if (place === 'staging') {
                FURL = FURLStaging;
            }
            var deferred = $q.defer();
            var url = FURL + '/articles/';
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


        delete: function(articleId, place) {
            var FURL;
            if (place === 'live') {
                FURL = FURLLive;
            } else if (place === 'staging') {
                FURL = FURLStaging;

            }
            console.log('deleting article ' + articleId);
            var deferred = $q.defer();
            var ref = new Firebase(FURL).child('articles/' + articleId);

            var obj = $firebaseObject(ref);
            obj.$remove().then(function() {
                deferred.resolve(obj);
            }, function(error) {
                console.log("Error:", error);
                deferred.reject(error);
            });
            return deferred.promise;
        },



    };
}]);
