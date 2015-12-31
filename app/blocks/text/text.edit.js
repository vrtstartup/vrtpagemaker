/* globals rangy */
'use strict';

angular.module('immersiveAngularApp')
    .directive('editText', function(firebaseBlocksService, TextEditorService) {
        return {
            template: '<div class="o-block__text"><p ng-model="data.parameters.text" medium-editor bind-options="mediumBindOptions"></p></div><edit-audioplayer ng-if="parameters.media" id="id" parameters="parameters"></edit-audioplayer>',
            restrict: 'E',
            scope: {
                id: '=',
                article: '=',
                parameters: '='
            },
            link: function postLink(scope) {

                /* Load the block */
                firebaseBlocksService.getObject(scope.article, scope.id).then(function(obj) {
                    obj.$bindTo(scope, "data");
                });
                scope.mediumBindOptions = TextEditorService.options;
            }
        };
    });
