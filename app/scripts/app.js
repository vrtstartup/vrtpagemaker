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
        'duParallax',
        'angular-medium-editor',
        'angular-filepicker',
        'as.sortable',
        'ngMaterial',
        'angulartics',
        'angulartics.google.analytics',
        '720kb.socialshare',
        'door3.css',
        'ngAudio',
        'duScroll',
        'angular-inview',
        'com.2fdevs.videogular',
        'com.2fdevs.videogular.plugins.controls',
        'com.2fdevs.videogular.plugins.overlayplay',
        'info.vietnamcode.nampnq.videogular.plugins.youtube'
    ])
    .constant("firebaseURL", {
        "FURL": "https://immersiveangular.firebaseio.com/",
        "FURLStaging": "https://immersiveangular.firebaseio.com/staging/",
        "FURLLive": "https://immersiveangular.firebaseio.com/live/"
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/pages.main.html',
                controller: 'MainController',

            })
            .when('/articles/:article', {
                templateUrl: 'views/pages.story.view.html',
                controller: 'StoryViewController',
            })
            .when('/edit/:article', {
                templateUrl: 'views/pages.story.edit.html',
                controller: 'StoryEditController',
            })
            .when('/edit', {
                templateUrl: 'views/pages.stories.edit.html',
                controller: 'StoriesEditController',
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function(filepickerProvider) {
        filepickerProvider.setKey('A1hmStH38TSfDN1qwiJOez');
    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('orange');
    });
