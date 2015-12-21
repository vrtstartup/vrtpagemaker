'use strict';

angular.module('immersiveAngularApp')
    .directive('viewPopup', function($compile) {
        return {
            templateUrl: 'blocks/popup/popup.html',
            restrict: 'E',
            replace: 'true',
            scope: {
                parameters: '='
            },

            link: function postLink(scope, ele) {


                scope.$watch('parameters.text', function(newValue) {
                    scope.text = newValue;
                });

                scope.$watch('parameters.content', function(newValue) {
                    scope.content = newValue;
                });


            }
        };
    });
