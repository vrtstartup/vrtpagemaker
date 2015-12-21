'use strict';

angular.module('immersiveAngularApp')
    .directive('editPopup', function($compile) {
        return {
            templateUrl: 'blocks/popup/popup.html',
            restrict: 'E',
            replace: 'true',
            scope: {
                parameters: '='
            },

            link: function postLink(scope, ele) {



                // scope.$watch('view', function(newValue) {
                //     if (newValue === 'top') {
                //         ele.html(scope.parameters.svg);
                //         $compile(ele.contents())(scope);
                //     }
                // });

                // scope.$watch('parameters.svg', function(newValue) {
                //     if (newValue) {
                //         ele.html(scope.parameters.svg);
                //         $compile(ele.contents())(scope);
                //     }
                // });
            }
        };
    });
