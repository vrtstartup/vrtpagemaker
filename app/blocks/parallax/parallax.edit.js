'use strict';

angular.module('immersiveAngularApp')
    .directive('editParallax', function(parallaxHelper) {
        return {
            // template: '<div class="o-block" ><img src="{{parameters.url}}" du-parallax y="background" alt="" rotation="rotation"  x="slideInFromLeft"/></div>',
            template: '<div class="o-block" ><img src="{{parameters.url}}" du-parallax y="background" alt=""  x="slideIn"/></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },
            link: function postLink(scope) {


                scope.$watch('parameters.rotation', function(newValue, oldValue) {
                    if (newValue) {
                        scope.rotation = function(elementPosition) {
                            return elementPosition.elemY / newValue + 'deg';
                        }
                    }
                });


                scope.$watch('parameters.slideIn', function(newValue, oldValue) {
                    if (newValue) {
                        scope.slideIn = function(elementPosition) {
                            return elementPosition.elemY / newValue;
                        }
                    }
                });

                scope.background = parallaxHelper.createAnimator(-0.3);



            }
        };
    });


//https://github.com/oblador/angular-parallax
