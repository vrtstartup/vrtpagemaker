'use strict';

/**
 * @ngdoc service
 * @name immersiveAngularApp.blocks
 * @description
 * # blocks
 * Service in the immersiveAngularApp.
 */
angular.module('immersiveAngularApp')
    .factory('blocksValues', ['$q', 'FBArticle', function($q) {



        /*
            All functions available in the Templates Service
        */


        var blocks = {
            '0': {
                'type': 'text',
                'dialog': 'blocks/text/textBlockDialog.html',
                'edit': '<block-text class="o-container__block" id="id" article="article" parameters="parameters"></block-text>',
                'view': '<view-text class="o-container__block" id="id" article="article" parameters="parameters"></view-text>',
                'button': {
                    'type': 'text',
                    'name': 'tekst'
                }
            },
            '1': {
                'type': 'image',
                'dialog': 'blocks/image/imageBlockDialog.html',
                'edit': '<block-image class="o-container__block" id="id" article="article" parameters="parameters"></block-image>',
                'view': '<view-image class="o-container__block" id="id" article="article" parameters="parameters"></view-image>',
                'button': {
                    'type': 'image',
                    'name': 'afbeelding'
                }
            },
            '2': {
                'type': 'video',
                'dialog': 'blocks/video/videoDialog.html',
                'edit': '<block-video class="o-container__block" id="id" article="article" parameters="parameters"></block-video>',
                'view': '<view-video class="o-container__block" id="id" article="article" parameters="parameters"></view-video>',
                'button': {
                    'type': 'video',
                    'name': 'Film'
                }
            },
            '3': {
                'type': 'iframe',
                'dialog': 'blocks/iframe/iframeBlockDialog.html',
                'edit': '<block-iframe class="o-container__block" id="id" article="article" parameters="parameters"></block-iframe>',
                'view': '<view-iframe class="o-container__block" id="id" article="article" parameters="parameters"></view-iframe>',
                'button': {
                    'type': 'iframe',
                    'name': 'iframe'
                }
            }
        };


        var styles = {
            '0': {
                'type': 'small',
                'width': 33
            },
            '1': {
                'type': 'normal',
                'width': 50
            },
            '3': {
                'type': 'wide',
                'width': 80
            },
            '4': {
                'type': 'full',
                'width': 100
            }
        };



        return {
            dialogs: function(type) {
                var deferred = $q.defer();
                var template;
                /* Depending of the type of the dialog, we choose a template, and after that open up the dialog. */

                for (var key in blocks) {
                    if (blocks.hasOwnProperty(key)) {
                        if (type === blocks[key].type) {
                            deferred.resolve(blocks[key].dialog);
                        } else {
                            console.log('this dialog does not exist');
                        }
                    }
                }
                return deferred.promise;
            },

            editdirectives: function(type) {
                for (var key in blocks) {
                    if (blocks.hasOwnProperty(key)) {
                        if (type === blocks[key].type) {
                            return blocks[key].edit;
                        } else {
                            console.log('this block does not exist');
                        }

                    }
                }
            },

            viewdirectives: function(type) {
                for (var key in blocks) {
                    if (blocks.hasOwnProperty(key)) {
                        if (type === blocks[key].type) {
                            return blocks[key].view;
                        } else {
                            console.log('this block does not exist');
                        }

                    }
                }
            },

            buttons: function() {

                var buttons = [];
                for (var key in blocks) {
                    if (blocks.hasOwnProperty(key)) {
                        buttons.push(blocks[key].button);
                    }
                }



                return buttons;


            },

            styles: function(style) {
                for (var key in styles) {
                    if (styles.hasOwnProperty(key)) {
                        if (style === styles[key].type) {
                            return styles[key];
                        } else {
                            console.log('this style does not exist');
                        }

                    }
                }


            }



        };
    }]);
