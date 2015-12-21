(function() {
    'use strict';

    function storyHeader() {
        var directive = {
            restrict: 'E',
            templateUrl: 'views/templates.story.storyheader.html',
            scope: {
                image: '=',
                title: '=',
                author: '=',
                brand: '=',
                refer: '='
            }
        };
        return directive;
    }
    angular
        .module('immersiveAngularApp')
        .directive('storyHeader', storyHeader);


})();
