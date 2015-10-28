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
                'type': 'delete',
                'dialog': 'views/deleteDialog.html',
            },
            '1': {
                'type': 'text',
                'dialog': 'blocks/text/textBlockDialog.html',
                'edit': '<block-text class="o-container__block" id="id" article="article" parameters="parameters"></block-text>',
                'view': '<view-text class="o-container__block" id="id" article="article" parameters="parameters"></view-text>',
                'button': {
                    'type': 'text',
                    'name': 'tekst'
                }
            },
            '2': {
                'type': 'image',
                'dialog': 'blocks/image/imageBlockDialog.html',
                'edit': '<block-image class="o-container__block" id="id" article="article" parameters="parameters"></block-image>',
                'view': '<view-image class="o-container__block" id="id" article="article" parameters="parameters"></view-image>',
                'button': {
                    'type': 'image',
                    'name': 'afbeelding'
                }
            },
            '3': {
                'type': 'video',
                'dialog': 'blocks/video/videoDialog.html',
                'edit': '<block-video class="o-container__block" id="id" article="article" parameters="parameters"></block-video>',
                'view': '<view-video class="o-container__block" id="id" article="article" parameters="parameters"></view-video>',
                'button': {
                    'type': 'video',
                    'name': 'Film'
                }
            },
            '4': {
                'type': 'iframe',
                'dialog': 'blocks/iframe/iframeBlockDialog.html',
                'edit': '<block-iframe class="o-container__block" id="id" article="article" parameters="parameters"></block-iframe>',
                'view': '<view-iframe class="o-container__block" id="id" article="article" parameters="parameters"></view-iframe>',
                'button': {
                    'type': 'iframe',
                    'name': 'iframe'
                }
            },
            '5': {
                'type': 'hero',
                'dialog': 'blocks/hero/heroBlockDialog.html',
                'edit': '<block-hero class="o-container__block" id="id" article="article" parameters="parameters"></block-hero>',
                'view': '<view-hero class="o-container__block" id="id" article="article" parameters="parameters"></view-hero>',
                'button': {
                    'type': 'hero',
                    'name': 'Afbeelding met tekst'
                }
            },
            '6': {
                'type': 'parallax',
                'dialog': 'blocks/parallax/parallaxBlockDialog.html',
                'edit': '<block-parallax class="o-container__block" id="id" article="article" parameters="parameters"></block-parallax>',
                'view': '<view-parallax class="o-container__block" id="id" article="article" parameters="parameters"></view-parallax>',
                'button': {
                    'type': 'parallax',
                    'name': 'Parallax foto'
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


        var filters = [
            'geen', 'aden', 'reyes', 'perpetua', 'inkwell', 'toaster', 'walden', 'hudson', 'gingham', 'mayfair', 'lofi', 'xpro2', '_1977', 'brooklyn'
        ];




        return {
            dialogs: function(type) {
                var deferred = $q.defer();
                var template;
                /* Depending of the type of the dialog, we choose a template, and after that open up the dialog. */

                for (var key in blocks) {
                    if (blocks.hasOwnProperty(key)) {
                        if (type === blocks[key].type) {
                            deferred.resolve(blocks[key].dialog);
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
                        }
                    }
                }
            },

            viewdirectives: function(type) {
                for (var key in blocks) {
                    if (blocks.hasOwnProperty(key)) {
                        if (type === blocks[key].type) {
                            return blocks[key].view;
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
                        }
                    }
                }
            },



            filters: function() {
                return filters;
            }



        };
    }]);
