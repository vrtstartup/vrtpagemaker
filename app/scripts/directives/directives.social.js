(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .directive('social', social);

    function social() {
        var directive = {
            restrict: 'E',
            templateUrl: 'views/social.html',
            scope: {
                text: '=',
                image: '='
            }
        };

        return directive;
    }
})();
