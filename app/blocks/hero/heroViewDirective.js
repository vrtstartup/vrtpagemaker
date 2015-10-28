'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockHero
 * @description
 * # blockImage
 */
angular.module('immersiveAngularApp')
    .directive('viewHero', function() {
        return {
            template: '<div class="o-hero"><div class="o-hero__img" ><figure class="{{parameters.filter}}"><img ng-src="{{parameters.url}}" ></figure><div class="o-hero__text" layout="row" layout-align="center center"><div ng-bind-html="parameters.text"></div></div></div></div>',
            restrict: 'E',
            scope: {
                id: '=',
                article: '=',
                parameters: '='
            },

            link: function postLink(scope) {
                console.log('test');

            }
        };
    });