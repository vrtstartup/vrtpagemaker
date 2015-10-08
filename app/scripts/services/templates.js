'use strict';

/**
 * @ngdoc service
 * @name immersiveAngularApp.blocks
 * @description
 * # blocks
 * Service in the immersiveAngularApp.
 */
angular.module('immersiveAngularApp')
    .factory('templates', ['$q', 'FBArticle', function($q, FBArticle) {



        /*
            All functions available in the Templates Service
        */
        return {



            dialogTemplates: function(type) {
                var deferred = $q.defer();
                var template;
                /* Depending of the type of the dialog, we choose a template, and after that open up the dialog. */
                switch (type) {
                    case 'image':
                        template = '../../blocks/image/imageBlockDialog.html';
                        deferred.resolve(template);
                        break;
                    case 'parallax':
                        template = '../../blocks/parallax/parallaxBlockDialog.html';
                        deferred.resolve(template);
                        break;

                    case 'video':
                        template = '../../blocks/video/videoBlockDialog.html';
                        deferred.resolve(template);
                        break;

                    case 'twitter':
                        template = '../../blocks/twitter/twitterBlockDialog.html';
                        deferred.resolve(template);
                        break;

                    case 'facebook':
                        template = '../../blocks/facebook/facebookBlockDialog.html';
                        deferred.resolve(template);
                        break;

                    case 'delete':
                        template = '../views/deleteDialog.html';
                        deferred.resolve(template);
                        break;

                    default:
                        console.log('This dialog does not exist');
                };
                return deferred.promise;
            }



        };
    }]);
