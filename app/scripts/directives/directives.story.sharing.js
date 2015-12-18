(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .directive('sharing', sharing);

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
})();
