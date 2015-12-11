'use strict';


angular.module('immersiveAngularApp')
    .factory('valuesService', ['$q', function($q) {


        var blocks = {
            '0': {
                'type': 'meta',
                'dialog': 'views/templates.dialog.story.meta.html',
            },
            '1': {
                'type': 'text',
                'dialog': 'blocks/text/text.dialog.html',
                'edit': '<edit-text class="o-container__block" id="id" article="article" parameters="parameters"></edit-text>',
                'view': '<view-text class="o-container__block" id="id" article="article" parameters="parameters"></view-text>',
                'button': {
                    'type': 'text',
                    'name': 'tekst'
                }
            },
            '2': {
                'type': 'image',
                'dialog': 'blocks/image/image.dialog.html',
                'edit': '<edit-image class="o-container__block" id="id" article="article" parameters="parameters"></edit-image>',
                'view': '<view-image class="o-container__block" id="id" article="article" parameters="parameters"></view-image>',
                'button': {
                    'type': 'image',
                    'name': 'afbeelding'
                }
            },
            '3': {
                'type': 'video',
                'dialog': 'blocks/video/video.dialog.html',
                'edit': '<edit-video class="o-container__block" id="id" article="article" parameters="parameters"></edit-video>',
                'view': '<view-video class="o-container__block" id="id" article="article" parameters="parameters"></view-video>',
                'button': {
                    'type': 'video',
                    'name': 'Film'
                }
            },
            '4': {
                'type': 'iframe',
                'dialog': 'blocks/iframe/iframe.dialog.html',
                'edit': '<edit-iframe class="o-container__block" id="id" article="article" parameters="parameters"></edit-iframe>',
                'view': '<view-iframe class="o-container__block" id="id" article="article" parameters="parameters"></view-iframe>',
                'button': {
                    'type': 'iframe',
                    'name': 'iframe'
                }
            },
            '5': {
                'type': 'hero',
                'dialog': 'blocks/hero/hero.dialog.html',
                'edit': '<edit-hero class="o-container__block" id="id" article="article" parameters="parameters"></edit-hero>',
                'view': '<view-hero class="o-container__block" id="id" article="article" parameters="parameters"></view-hero>',
                'button': {
                    'type': 'hero',
                    'name': 'Afbeelding met tekst'
                }
            },
            '6': {
                'type': 'parallax',
                'dialog': 'blocks/parallax/parallax.dialog.html',
                'edit': '<edit-parallax class="o-container__block" id="id" article="article" parameters="parameters"></edit-parallax>',
                'view': '<view-parallax class="o-container__block" id="id" article="article" parameters="parameters"></view-parallax>',
                'button': {
                    'type': 'parallax',
                    'name': 'Parallax foto'
                }
            },
            '7': {
                'type': 'break',
                'dialog': 'blocks/break/break.dialog.html',
                'edit': '<edit-break class="o-container__block" id="id" article="article" parameters="parameters"></edit-break>',
                'view': '<view-break class="o-container__block" id="id" article="article" parameters="parameters"></view-break>',
                'button': {
                    'type': 'break',
                    'name': 'Break'
                }
            },
            '8': {
                'type': 'map',
                'dialog': 'blocks/map/map.dialog.html',
                'edit': '<edit-map class="o-container__block" id="id" article="article" parameters="parameters"></edit-map>',
                'view': '<view-map class="o-container__block" id="id" article="article" parameters="parameters"></view-map>',
                'button': {
                    'type': 'map',
                    'name': 'Map'
                }
            },
            '9': {
                'type': 'facebook',
                'dialog': 'blocks/facebook/facebook.dialog.html',
                'edit': '<edit-facebook class="o-container__block" id="id" article="article" parameters="parameters"></edit-facebook>',
                'view': '<view-facebook class="o-container__block" id="id" article="article" parameters="parameters"></view-facebook>',
                'button': {
                    'type': 'facebook',
                    'name': 'Facebook'
                }
            },
            '10': {
                'type': 'instagram',
                'dialog': 'blocks/instagram/instagram.dialog.html',
                'edit': '<edit-instagram class="o-container__block" id="id" article="article" parameters="parameters"></edit-instagram>',
                'view': '<view-instagram class="o-container__block" id="id" article="article" parameters="parameters"></view-instagram>',
                'button': {
                    'type': 'instagram',
                    'name': 'instagram'
                }
            },
            '11': {
                'type': 'twitter',
                'dialog': 'blocks/twitter/twitter.dialog.html',
                'edit': '<edit-twitter class="o-container__block" id="id" article="article" parameters="parameters"></edit-twitter>',
                'view': '<view-twitter class="o-container__block" id="id" article="article" parameters="parameters"></view-twitter>',
                'button': {
                    'type': 'twitter',
                    'name': 'twitter'
                }
            },
            '12': {
                'type': 'linepainter',
                'dialog': 'blocks/linepainter/linepainter.dialog.html',
                'edit': '<edit-linepainter class="o-container__block" id="id" article="article" parameters="parameters"></edit-linepainter>',
                'view': '<view-linepainter class="o-container__block" id="id" article="article" parameters="parameters"></view-linepainter>',
                'button': {
                    'type': 'linepainter',
                    'name': 'Lijnentekening'
                }
            },
            '13': {
                'type': 'svg',
                'dialog': 'blocks/svg/svg.dialog.html',
                'edit': '<edit-svg class="o-container__block" id="id" article="article" parameters="parameters"></edit-svg>',
                'view': '<view-svg class="o-container__block" id="id" article="article" parameters="parameters"></view-svg>',
                'button': {
                    'type': 'svg',
                    'name': 'SVG-afbeelding'
                }
            }
        };

        var styles = {
            '0': {
                'type': '33',
                'width': 33
            },
            '1': {
                'type': '50',
                'width': 50
            },
            '2': {
                'type': '80',
                'width': 80
            },
            '3': {
                'type': '100',
                'width': 100
            }
        };

        var filters = [
            'geen', 'aden', 'reyes', 'perpetua', 'inkwell', 'toaster', 'walden', 'hudson', 'gingham', 'mayfair', 'lofi', 'xpro2', '_1977', 'brooklyn', 'blur'
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
                    if (blocks.hasOwnProperty(key) && blocks[key].button !== undefined) {
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
