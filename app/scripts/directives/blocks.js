'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blocks
 * @description
 * # blocks
 */
angular.module('immersiveAngularApp')
    .directive('blocks', function($compile) {
        return {
            template: '<div></div>',
            restrict: 'E',
            scope: {
                type: '=',
                parameters: '='
            },
            link: function postLink(scope, elem) {


                var template;
                switch (scope.type) {
                    case 'text':
                        template = '<block-text parameters="parameters"></block-text>';
                        break;
                    case 'image':
                        template = '<block-image parameters="parameters"></block-image>';
                        break;
                    case 'parallax':
                        template = '<block-parallax parameters="parameters"></block-parallax>';
                        break;

                    case 'video':
                        template = '<block-video parameters="parameters"></block-video>';
                        break;

                    case 'twitter':
                        template = '<block-twitter parameters="parameters"></block-twitter>';
                        break;

                    case 'facebook':
                        template = '<block-facebook parameters="parameters"></block-facebook>';
                        break;

                    default:
                        console.log('This is not a valid contentblock');
                }





                var compiled = $compile(template)(scope);
                elem.append(compiled);

            }
        };
    });
