'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blocks
 * @description
 * # blocks
 */
angular.module('immersiveAngularApp')
    .directive('blocksViewDispatcher', function($compile) {
        return {
            template: '<div></div>',
            restrict: 'E',
            scope: {
                type: '=',
                parameters: '=',
                id: '=',
                article: '='
            },
            link: function postLink(scope, elem) {


                var template;
                switch (scope.type) {
                    case 'text':
                        template = '<view-text class="o-container__block" id="id" article="article" parameters="parameters"></view-text>';
                    console.log('text');
                        break;
                    case 'image':
                        template = '<view-image class="o-container__block" parameters="parameters"></view-image>';
                        break;
                    case 'parallax':
                        template = '<view-parallax class="o-container__block" parameters="parameters"></view-parallax>';
                        break;

                    case 'video':
                        template = '<view-video class="o-container__block" parameters="parameters"></view-video>';
                        break;

                    case 'twitter':
                        template = '<view-twitter class="o-container__block" parameters="parameters"></view-twitter>';
                        break;

                    case 'facebook':
                        template = '<view-facebook  class="o-container__block" parameters="parameters"></view-facebook>';
                        break;


                    case 'iframe':
                        template = '<view-iframe  class="o-container__block" parameters="parameters"></view-iframe>';
                        break;

                    default:
                        console.log('This is not a valid contentblock');
                }


                var compiled = $compile(template)(scope);
                elem.empty().append(compiled);

            }
        };
    });
