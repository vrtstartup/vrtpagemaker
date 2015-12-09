'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockImage
 * @description
 * # blockImage
 */
angular.module('immersiveAngularApp')
    .directive('viewInstagram', function($sce) {

        return {
            template: '<div class="instagram embeds"><iframe src="{{ instagramUrl }}" frameborder="0" scrolling="no" allowtransparency="true"></iframe></div>',
            restrict: 'E',
            priority: 1000,
            scope: {
                parameters: '='
            },
            link: function postLink(scope, el, attrs) {
                changeUrl(scope.parameters.id);

                scope.$watch('parameters.id', function(newValue, oldValue) {
                    if (newValue) {
                        changeUrl(newValue);
                    };
                });

                function changeUrl(value) {
                    var regex = /https:\/\/www.instagram.com\/p\/([-_A-z0-9]*)/;
                    var parts = regex.exec(value);
                    var id;

                    if (parts) {
                        id = parts[1];
                    } else {
                        id = value;
                    }

                    scope.parameters.id = id;
                    scope.instagramUrl = $sce.trustAsResourceUrl('https://instagram.com/p/' + id + '/embed');
                }
            }
        };
    });
