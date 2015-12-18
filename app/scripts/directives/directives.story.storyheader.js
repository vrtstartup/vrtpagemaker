(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .directive('storyHeader', storyHeader);

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
})();
