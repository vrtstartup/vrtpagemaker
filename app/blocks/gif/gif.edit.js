(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .directive('editGif', editGif);

    function editGif() {
        var directive = {
            restrict: 'E',
            templateUrl: 'blocks/gif/gif.html',
            scope: {
                parameters: '='
            },
            link: linkFunc,
            controller: GifController
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {;

        }
    }

    GifController.$inject = [ '$rootScope', '$scope' ];

    function GifController($rootScope, $scope) {
        $rootScope.$on('duScrollspy:becameActive', function(event, element, target) {
            if (element[0].className.indexOf("image-scroll") > -1) {
                $scope.current = element[0].attributes.src.value;
            }
        });
    }
})();
