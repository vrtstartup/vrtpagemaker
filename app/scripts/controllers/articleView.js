'use strict';

/**
 * @ngdoc function
 * @name immersiveAngularApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the immersiveAngularApp
 */
angular.module('immersiveAngularApp')
    .controller('ArticleViewCtrl', function($scope, $routeParams, FBArticle)  {
        console.log($routeParams.article);

        // function Highlighter() {
        //     this.button = document.createElement('button');
        //     this.button.className = 'medium-editor-action';
        //     this.button.innerText = 'H';
        //     this.button.onclick = this.onClick.bind(this);
        //     this.classApplier = rangy.createCssClassApplier('highlight', {
        //         elementTagName: 'mark',
        //         normalize: true
        //     });
        // }
        // Highlighter.prototype.onClick = function() {
        //     this.classApplier.toggleSelection();
        // };
        // Highlighter.prototype.getButton = function() {
        //     return this.button;
        // };
        // Highlighter.prototype.checkState = function(node) {
        //     if (node.tagName == 'MARK') {
        //         this.button.classList.add('medium-editor-button-active');
        //     }
        // };

        // this.mediumBindOptions = {
        //     extensions: {
        //         'highlight': new Highlighter()
        //     }
        // };





          FBArticle.get($routeParams.article)
                .then(function(firebaseObj) {
                    console.log(firebaseObj);

                });

    });
