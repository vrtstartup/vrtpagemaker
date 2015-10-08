'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockText
 * @description
 * # blockText
 */
angular.module('immersiveAngularApp')
    .directive('blockText', function(FBBlock) {
        return {
            template: '<div class="o-block__text--full colorNested"><p ng-model="data.text" medium-editor options="{{options}}" bind-options="mediumBindOptions"></p></div>',
            restrict: 'E',
            scope: {
                id: '=',
                article: '='
            },
            link: function postLink(scope) {
                /* Load the block */
                FBBlock.getObject(scope.article, scope.id).then(function(obj) {
                    obj.$bindTo(scope, "data");
                });

                scope.options = {
                    "buttons": ["bold", "italic", "highlight"]
                }
            }
        };
    });
