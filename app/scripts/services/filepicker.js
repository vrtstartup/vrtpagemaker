'use strict';

/**
 * @ngdoc service
 * @name immersiveAngularApp.filepicker
 * @description
 * # filepicker
 * Service in the immersiveAngularApp.
 */

angular.module('angularFilepicker', [])
.service('angularFilepicker', function($window){
    return $window.filepicker;
});
