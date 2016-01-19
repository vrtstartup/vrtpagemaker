'use strict';

angular.module('immersiveAngularApp')
    .directive('storyHeader', function($compile, templatesService) {
        return {
            templateUrl: 'views/templates.story.storyheader.html',
            restrict: 'E',
            scope: {
                image: '=',
                maintitle: '=',
                video: '=',
                subtitle: '=',
                author: '=',
                brand: '=',
                refer: '=',
                sharing: '='
            },
            link: function postLink(scope) {

                scope.fullScreen = true;
                scope.muted = true;
                // scope.zIndex = '22';


                scope.$watch('video', function(newValue) {
                    if (newValue) {
                        scope.resources = [
                            newValue.url
                        ];
                    }
                });



                scope.$watch('brand', function(newValue) {

                    if (newValue) {
                        templatesService.getBrand(scope.brand).then(function(brand) {
                            scope.brandLogo = 'brands/' + brand.name + '/' + brand.logo;
                        });
                    }
                });


            }
        };
    });
