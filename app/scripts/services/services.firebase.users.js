/* globals Firebase */
'use strict';

angular.module('immersiveAngularApp')

.factory("Auth", ["$firebaseAuth", "firebaseURL",
    function($firebaseAuth, firebaseURL) {
        var ref = new Firebase(firebaseURL.FURL);
        return $firebaseAuth(ref);
    }
]);
