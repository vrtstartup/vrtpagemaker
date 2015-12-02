/* globals Firebase */
'use strict';

angular.module('immersiveAngularApp')

.factory('firebaseMainService', ['$firebaseArray', '$firebaseObject', '$q', 'firebaseURL', function($firebaseArray, $firebaseObject, $q, firebaseURL) {


    var FURL =  firebaseURL.FURL;

    var getReadableDate = function() {
        return Date(Firebase.ServerValue.TIMESTAMP * 1000);
    };

    return {

        addFeedback: function(name, feedback, userAgent, width, height, article) {
            console.log('adding feedback from ' + name);
            var deferred = $q.defer();
            var ref = new Firebase(FURL).child('feedback/');
            var list = $firebaseArray(ref);
            list.$add({
                'feedback': feedback,
                'name': name,
                'createdAt': getReadableDate(),
                'userAgent': userAgent,
                'width': width,
                'height': height,
                'article': article
            }).then(function(ref) {
                var id = ref.key();
                deferred.resolve(id);
            });
            return deferred.promise;
        }

    };
}]);
