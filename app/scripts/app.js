'use strict';

/**
 * @ngdoc overview
 * @name immersiveAngularApp
 * @description
 * # immersiveAngularApp
 *
 * Main module of the application.
 */
angular
    .module('immersiveAngularApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'firebase',
        'ngDialog',
        'ngParallax',
        'angular-medium-editor',
        'angular-filepicker',
        'as.sortable',
        'ngMaterial'

    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',

            })
            .when('/articles/:article', {
                templateUrl: 'views/articleView.html',
                controller: 'ArticleViewCtrl',

            })
            .when('/edit/:article', {
                templateUrl: 'views/articleEdit.html',
                controller: 'ArticleEditCtrl',

            })
            .when('/info', {
                templateUrl: 'views/info.html',
                controller: 'InfoCtrl',

            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function(filepickerProvider) {
        filepickerProvider.setKey('A1hmStH38TSfDN1qwiJOez');
    });
