'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockImage
 * @description
 * # blockImage
 */
angular.module('immersiveAngularApp')
    .directive('blockFacebook', function($sce) {
        return {
            template: '<div></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },

            link: function postLink(scope, el) {

                var fbhtml = scope.parameters.html;

                scope.fbembed = $sce.trustAsHtml(fbhtml);
                console.log(scope.fbembed);
                el.append(fbhtml);
            }


        }

    });
