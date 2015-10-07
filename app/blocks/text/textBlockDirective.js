'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockText
 * @description
 * # blockText
 */
angular.module('immersiveAngularApp')
    .directive('blockText', function() {
        return {
            template: '<div><p ng-model="parameters.text" medium-editor options="{{options}}" bind-options="mediumBindOptions"></p></div>',
            restrict: 'E',
             scope: {
                parameters: '='
            },
            link: function postLink(scope) {
                console.log(scope.parameters.text);

                scope.options = {
                    "buttons": ["bold", "italic", "highlight"]
                }
            }
        };
    });
