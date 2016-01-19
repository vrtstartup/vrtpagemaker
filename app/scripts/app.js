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
        'ngMessages',
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
        'info.vietnamcode.nampnq.videogular.plugins.youtube',
        'angular-carousel',
        'ngVidBg'
    ])
    .constant("firebaseURL", {
        "FURL": "https://immersivevrtstartup.firebaseio.com/",
        "FURLStaging": "https://immersivevrtstartup.firebaseio.com/staging/",
        "FURLLive": "https://immersivevrtstartup.firebaseio.com/live/"
    })
    .run(["$rootScope", "$location", function($rootScope, $location) {
        $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $location.path("/home");
            }
        });
    }])

.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/pages.main.html',
                controller: 'MainController'

            })
            .when('/articles/:article', {
                templateUrl: 'views/pages.story.view.html',
                controller: 'StoryViewController'
            })
            .when('/edit/:article', {
                templateUrl: 'views/pages.story.edit.html',
                controller: 'StoryEditController',
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    "currentAuth": ["Auth", function(Auth) {
                        // $waitForAuth returns a promise so the resolve waits for it to complete
                        return Auth.$waitForAuth();
                    }]
                }
            })
            .when('/edit', {
                templateUrl: 'views/pages.stories.edit.html',
                controller: 'StoriesEditController',
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    "currentAuth": ["Auth", function(Auth) {
                        // $waitForAuth returns a promise so the resolve waits for it to complete
                        return Auth.$waitForAuth();
                    }]
                }
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
