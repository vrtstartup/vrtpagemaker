'use strict';

angular.module('immersiveAngularApp')
    .directive('editText', function(firebaseBlocksService) {
        return {
            template: '<div class="o-block__text"><p ng-model="data.parameters.text" medium-editor options="{{options}}" bind-options="mediumBindOptions"></p></div>',
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

                scope.options = {
                    "buttons": ["bold", "italic", "anchor", "header1", "header2", "quote", "orderedlist", "justifyCenter", "justifyFull", "justifyLeft", "justifyRight", "underline", "strikethrough", "superscript", "subscript", "highlight"]
                };

                function Highlighter() {
                    this.button = document.createElement('button');
                    this.button.className = 'medium-editor-action';
                    this.button.innerText = 'M';
                    this.button.onclick = this.onClick.bind(this);
                    this.classApplier = rangy.createCssClassApplier('highlight', {
                        elementTagName: 'mark',
                        normalize: true
                    });
                }
                Highlighter.prototype.onClick = function() {
                    this.classApplier.toggleSelection();
                };
                Highlighter.prototype.getButton = function() {
                    return this.button;
                };
                Highlighter.prototype.checkState = function(node) {
                    if (node.tagName == 'MARK') {
                        this.button.classList.add('medium-editor-button-active');
                    }
                };
                scope.mediumBindOptions = {
                    extensions: {
                        'highlight': new Highlighter()
                    }
                }
            }
        };
    });
