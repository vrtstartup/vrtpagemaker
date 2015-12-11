'use strict';

angular.module('immersiveAngularApp')
    .directive('editLinepainter', function($compile) {
        return {
            template: '<div><edit-svg parameters="svg"></edit-svg></div>',
            restrict: 'E',
            replace: 'true',
            scope: {
                parameters: '='
            },

            link: function postLink(scope, ele) {
                var finishedDrawing = function(){
                    console.log('finish');
                };
                scope.svg = {
                    svg : scope.parameters.svg
                };
                new Vivus('svg', {duration: 2000}, finishedDrawing);

            }
        };
    });
