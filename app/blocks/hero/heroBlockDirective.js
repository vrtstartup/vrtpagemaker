'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockHero
 * @description
 * # blockHero
 */
angular.module('immersiveAngularApp')
    .directive('blockHero', function(FBBlock, parallaxHelper) {
        return {
            template: '<div class="o-hero" /><div class="o-hero__img" ><figure  du-parallax y="background" class="{{filter}}"><img ng-src="{{url}}" ></figure><div class="o-hero__text" layout="row" layout-align="center center"><div><p ng-model="data.parameters.text" medium-editor options="{{options}}" bind-options="mediumBindOptions"></p></div></div></div></div>',
            restrict: 'E',
            scope: {
                id: '=',
                article: '=',
                parameters: '='
            },

            link: function postLink(scope, el) {

                scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);



                FBBlock.getObject(scope.article, scope.id).then(function(obj) {
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
                };


                scope.$watch('parameters.url', function(newValue, oldValue) {
                    if (newValue) {
                        scope.url = newValue;
                    }
                });

                scope.$watch('parameters.filter', function(newValue, oldValue) {
                    if (newValue) {
                        scope.filter = newValue;
                    };
                });


            }
        };
    });
