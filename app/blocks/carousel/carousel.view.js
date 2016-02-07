'use strict';

angular.module('immersiveAngularApp')
    .directive('viewCarousel', function() {
        return {
            templateUrl: 'blocks/carousel/carousel.view.html',
            restrict: 'E',
            scope: {
                id: '=',
                parameters: '=',
            },

            link: function postLink() {


            },

        };
    });
