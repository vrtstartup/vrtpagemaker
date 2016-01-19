'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockHero
 * @description
 * # blockHero
 */
angular.module('immersiveAngularApp')
    .directive('editHero', function(firebaseBlocksService, $sce) {
        return {
            // templateUrl: 'blocks/hero/hero.edit.html',
            template: '<div class="o-hero"><div class="o-hero__content"><figure class="o-cssfilter {{filter}}"><img ng-show="mimetype == \'image\'" class="o-hero__image" ng-src="{{parameters.url}}"><div class="o-videogular" ng-show="mimetype == \'video\'"><videogular in-view="view = $inviewpart" vg-player-ready="onPlayerReady($API)"><vg-media vg-loop="loop" vg-src="videogularConfig.sources" vg-youtube="rel=1;showinfo=1" vg-tracks="videogularConfig.tracks" vg-native-controls="false"></vg-media><div ng-hide="buttons"><vg-controls vg-autohide="videogularConfig.plugins.controls.autoHide" vg-autohide-time="videogularConfig.plugins.controls.autoHideTime"><div ng-click="videoAPI.play()"  class="o-videogular__playback"><div ng-include="\'icons/replay.html\'"></div></vg-controls></div><vg-poster vg-url="controller.config.plugins.poster"></vg-poster></videogular></div></figure><div class="o-hero__text" layout="row" layout-align="{{data.parameters.xaxis}} {{data.parameters.yaxis}}"><div><p ng-model="data.parameters.text" medium-editor bind-options="mediumBindOptions"></p></div></div></div></div>',
            restrict: 'E',
            scope: {
                id: '=',
                article: '=',
                parameters: '='
            },

            link: function postLink(scope) {

                firebaseBlocksService.getObject(scope.article, scope.id).then(function(obj) {
                    obj.$bindTo(scope, "data");

                });





                /* Add an extra function, can be any CSS class */
                function specialStyleOne() {
                    this.button = document.createElement('button');
                    this.button.className = 'medium-editor-action';
                    this.button.innerText = 'S1';
                    this.button.onclick = this.onClick.bind(this);
                    this.classApplier = rangy.createCssClassApplier('brand-special-style-one', {
                        elementTagName: 'specialone',
                        normalize: true
                    });
                }
                specialStyleOne.prototype.onClick = function() {
                    this.classApplier.toggleSelection();
                };
                specialStyleOne.prototype.getButton = function() {
                    return this.button;
                };
                specialStyleOne.prototype.checkState = function(node) {
                    if (node.tagName === 'SPECIALONE') {
                        this.button.classList.add('medium-editor-button-active');
                    }
                };


                     /* Add an extra function, can be any CSS class */
                function specialStyleTwo() {
                    this.button = document.createElement('button');
                    this.button.className = 'medium-editor-action';
                    this.button.innerText = 'S2';
                    this.button.onclick = this.onClick.bind(this);
                    this.classApplier = rangy.createCssClassApplier('brand-special-style-two', {
                        elementTagName: 'specialtwo',
                        normalize: true
                    });
                }
                specialStyleTwo.prototype.onClick = function() {
                    this.classApplier.toggleSelection();
                };
                specialStyleTwo.prototype.getButton = function() {
                    return this.button;
                };
                specialStyleTwo.prototype.checkState = function(node) {
                    if (node.tagName === 'SPECIALTWO') {
                        this.button.classList.add('medium-editor-button-active');
                    }
                };




                     /* Add an extra function, can be any CSS class */
                function specialStyleThree() {
                    this.button = document.createElement('button');
                    this.button.className = 'medium-editor-action';
                    this.button.innerText = 'S3';
                    this.button.onclick = this.onClick.bind(this);
                    this.classApplier = rangy.createCssClassApplier('brand-special-style-three', {
                        elementTagName: 'specialthree',
                        normalize: true
                    });
                }
                specialStyleThree.prototype.onClick = function() {
                    this.classApplier.toggleSelection();
                };
                specialStyleThree.prototype.getButton = function() {
                    return this.button;
                };
                specialStyleThree.prototype.checkState = function(node) {
                    if (node.tagName === 'SPECIALTHREE') {
                        this.button.classList.add('medium-editor-button-active');
                    }
                };





                     /* Add an extra function, can be any CSS class */
                function specialStyleFour() {
                    this.button = document.createElement('button');
                    this.button.className = 'medium-editor-action';
                    this.button.innerText = 'S4';
                    this.button.onclick = this.onClick.bind(this);
                    this.classApplier = rangy.createCssClassApplier('brand-special-style-four', {
                        elementTagName: 'specialfour',
                        normalize: true
                    });
                }
                specialStyleFour.prototype.onClick = function() {
                    this.classApplier.toggleSelection();
                };
                specialStyleFour.prototype.getButton = function() {
                    return this.button;
                };
                specialStyleFour.prototype.checkState = function(node) {
                    if (node.tagName === 'SPECIALFOUR') {
                        this.button.classList.add('medium-editor-button-active');
                    }
                };









                /*

                    Options for medium editor. For more options: https://github.com/yabwe/medium-editor

                    BUG: can not toggle H1 or H2

                */
                var options = {
                    extensions: {
                        specialOne: new specialStyleOne(),
                        specialTwo: new specialStyleTwo(),
                        specialThree: new specialStyleThree(),
                        specialFour: new specialStyleFour()
                    },
                    targetBlank: true,
                    toolbar: {
                        buttons: ['bold', {
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
                                name: 'quote',
                                contentDefault: 'q'
                            }, {
                                name: 'h1',
                                action: 'append-h2',
                                aria: 'header type 1',
                                tagNames: ['h2'],
                                contentDefault: '<b>H1</b>',
                                classList: ['custom-class-h1'],
                                attrs: {
                                    'data-custom-attr': 'attr-value-h1'
                                }
                            }, {
                                name: 'h3',
                                contentDefault: 'h2'
                            },
                            'specialOne',
                            'specialTwo',
                            'specialThree',
                            'specialFour'
                        ]
                    }
                };

                scope.mediumBindOptions = options;






                scope.videoAPI = null;
                scope.videoStartedOnce = false;
                scope.autoplay = false;
                scope.loop = false;
                scope.buttons = false;
                scope.mute = false;
                scope.mimetype = 'image';

                scope.$watch('parameters.mimetype', function(newValue) {
                    if (newValue && newValue !== '') {

                        if (newValue.indexOf('video') > -1) {
                            scope.mimetype = 'video';
                        }
                    }
                });

                scope.$watch('parameters.autoplay', function(newValue) {
                    if (newValue && newValue !== '') {
                        scope.autoplay = newValue;
                    }
                });

                scope.$watch('parameters.loop', function(newValue) {
                    if (newValue && newValue !== '') {
                        scope.loop = newValue;
                    }
                });

                scope.$watch('parameters.buttons', function(newValue) {
                    if (newValue && newValue !== '') {
                        scope.buttons = newValue;
                    }
                });

                scope.$watch('parameters.buttons', function(newValue) {
                    if (newValue && newValue !== '') {
                        scope.buttons = newValue;
                    }
                });

                scope.onPlayerReady = function(API) {
                    scope.videoAPI = API;
                };

                scope.$watch('view', function(newValue) {
                    if (newValue === 'both' && scope.videoStartedOnce === false && scope.autoplay === true) {
                        scope.videoAPI.setVolume(0);
                        scope.videoAPI.play();
                        scope.videoStartedOnce = true;
                    }
                });




                scope.$watch('parameters.url', function(newValue) {
                    if (newValue && newValue !== '') {



                        scope.videogularConfig = {
                            preload: 'none',
                            autoPlay: scope.autoplay,
                            sources: [{
                                src: $sce.trustAsResourceUrl(newValue),
                                type: 'video/mp4'
                            }],
                            analytics: {
                                category: 'Video',
                                label: newValue,
                                events: {
                                    ready: true,
                                    play: true,
                                    pause: true,
                                    stop: true,
                                    complete: true,
                                    progress: 10
                                }
                            },
                            plugins: {
                                poster: scope.parameters.poster,
                                controls: {
                                    autoHide: true,
                                    autoHideTime: 3000
                                }
                            }

                        };


                    }
                });

            }

        };
    });
