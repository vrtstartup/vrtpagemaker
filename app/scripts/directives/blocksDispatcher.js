'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blocks
 * @description
 * # blocks
 */
angular.module('immersiveAngularApp')
    .directive('blocksDispatcher', function($compile) {
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
                        template = '<block-text class="o-container__block" id="id" article="article" ></block-text>';
                        break;
                    case 'image':
                        template = '<block-image class="o-container__block" parameters="parameters"></block-image>';
                        break;
                    case 'parallax':
                        template = '<block-parallax class="o-container__block" parameters="parameters"></block-parallax>';
                        break;

                    case 'video':
                        template = '<block-video class="o-container__block" parameters="parameters"></block-video>';
                        break;

                    case 'twitter':
                        template = '<block-twitter class="o-container__block" parameters="parameters"></block-twitter>';
                        break;

                    case 'facebook':
                        template = '<block-facebook  class="o-container__block" parameters="parameters"></block-facebook>';
                        break;


                    case 'iframe':
                        template = '<block-iframe  class="o-container__block" parameters="parameters"></block-iframe>';
                        break;

                    default:
                        console.log('This is not a valid contentblock');
                }


                var compiled = $compile(template)(scope);
                elem.empty().append(compiled);

            }
        };
    });
