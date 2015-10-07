/* globals Showdown */
'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:showdown
 * @description
 * # showdown
 */
angular.module('immersiveAngularApp')
    .directive('markdown', function() {
        var converter = new Showdown.converter();
        return {
            restrict: 'A',
            link: function(scope, element) {
                var htmlText = converter.makeHtml(element.text());
                element.html(htmlText);
            }
        };
    });
