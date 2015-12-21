(function() {
    'use strict';

function sharing() {
        var directive = {
            restrict: 'E',
            templateUrl: 'views/templates.story.sharing.html',
            scope: {
                text: '=',
                image: '='
            }
        };

        return directive;
    }

    angular
        .module('immersiveAngularApp')
        .directive('sharing', sharing);


})();
