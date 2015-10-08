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
                        template = '<block-text layout="column" layout-align="start center" id="id" article="article" ></block-text>';
                        break;
                    case 'image':
                        template = '<block-image layout="column" layout-align="start center" parameters="parameters"></block-image>';
                        break;
                    case 'parallax':
                        template = '<block-parallax layout="column" layout-align="start center" parameters="parameters"></block-parallax>';
                        break;

                    case 'video':
                        template = '<block-video layout="column" layout-align="start center" parameters="parameters"></block-video>';
                        break;

                    case 'twitter':
                        template = '<block-twitter  layout="column" layout-align="start center"parameters="parameters"></block-twitter>';
                        break;

                    case 'facebook':
                        template = '<block-facebook  layout="column" layout-align="start center" parameters="parameters"></block-facebook>';
                        break;

                    default:
                        console.log('This is not a valid contentblock');
                }


                var compiled = $compile(template)(scope);
                elem.empty().append(compiled);

            }
        };
    });
