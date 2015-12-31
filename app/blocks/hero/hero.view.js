'use strict';

angular.module('immersiveAngularApp')
    .directive('viewHero', function() {
        return {

            // template: '<div class="o-hero"><div class="o-hero__img"><figure class="o-cssfilter {{parameters.filter}}"><img class="o-hero__image" ng-src="{{parameters.url}}" ></figure><div class="o-hero__text" layout="row" layout-align="{{parameters.xaxis}} {{parameters.yaxis}}"><div><div ng-bind-html="parameters.text"></div></div></div></div></div>',
            templateUrl: 'blocks/hero/hero.view.html',
            restrict: 'E',
            scope: {
                id: '=',
                article: '=',
                parameters: '='
            },

            link: function postLink(scope) {

            }
        };
    });
