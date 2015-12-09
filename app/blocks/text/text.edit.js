'use strict';

angular.module('immersiveAngularApp')
    .directive('editText', function(firebaseBlocksService) {
        return {
            template: '<div class="o-block__text"><p ng-model="data.parameters.text" medium-editor bind-options="mediumBindOptions"></p></div>',
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



                scope.mediumBindOptions = {
                    toolbar: {
                        buttons: [{
                            name: 'bold',
                            contentDefault: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
                        }, {
                            name: 'italic',
                            contentDefault: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/></svg>'
                        }, {
                            name: 'underline',
                            contentDefault: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/></svg>'
                        }, {
                            name: 'strikethrough',
                            contentDefault: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/></svg>'
                        }, {
                            name: 'justifyLeft',
                            contentDefault: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
                        }, {
                            name: 'justifyCenter',
                            contentDefault: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
                        }, {
                            name: 'justifyRight',
                            contentDefault: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
                        }, {
                            name: 'anchor',
                            contentDefault: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>'
                        }, {
                            name: 'orderedlist',
                            contentDefault: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
                        }, {
                            name: 'unorderedlist',
                            contentDefault: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12.17c-.74 0-1.33.6-1.33 1.33s.6 1.33 1.33 1.33 1.33-.6 1.33-1.33-.59-1.33-1.33-1.33zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
                        }, {
                            name: 'superscript',
                            contentDefault: 'up'
                        }, {
                            name: 'subscript',
                            contentDefault: 'dw'
                        }, {
                            name: 'h2',
                            contentDefault: 'h1'
                        }, {
                            name: 'h3',
                            contentDefault: 'h2'
                        }]
                    }
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
            }
        };
    });
