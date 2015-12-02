'use strict';

angular.module('immersiveAngularApp')
    .service('loadTweets', function() {
        this.loadAllWidgets = function() {

            ! function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                    p = /^http:/.test(d.location) ? 'http' : 'https';
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = p + '://platform.twitter.com/widgets.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, 'script', 'twitter-wjs'); // jshint ignore:line
        };

        this.destroyAllWidgets = function() {
            var $ = function(id) {
                return document.getElementById(id);
            };
            var twitter = $('twitter-wjs');
            if (twitter != null) // jshint ignore:line
                twitter.remove(); // jshint ignore:line
        };
    });
