'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockImage
 * @description
 * # blockImage
 */
angular.module('immersiveAngularApp')
    .directive('blockTwitter', function($http, $compile, loadTweets) {
        return {
            template: '<div></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },

            link: function postLink(scope, el) {

                var getTweetId = function(url) {
                    var domains, i, id, kv, len, m, netloc, params, paramsStr, parser, path, ref;
                    domains = {
                        'twitter.com': 'twitter'
                    };
                    parser = document.createElement('a');
                    parser.href = url;
                    netloc = parser.hostname.toLowerCase();
                    path = parser.pathname;
                    if (path !== null && path.substr(0, 1) !== "/") {
                        path = "/" + path;
                    }
                    params = {};
                    paramsStr = parser.search.slice(1);
                    ref = paramsStr.split('&');
                    for (i = 0, len = ref.length; i < len; i++) {
                        kv = ref[i];
                        kv = kv.split("=");
                        params[kv[0]] = kv[1];
                    };
                    console.log(domains[netloc]);
                    if (domains[netloc] = 'twitter') {
                        console.log('Getting Tweet Id');
                        console.log(path);
                        m = path.match(/\/(\D+)(.+)/i);
                        console.log(m);
                        if (!m) {
                            return null;
                        } else {
                            return m[2];
                        }

                    }
                    return null;
                };

                var tweetId = getTweetId(scope.parameters.url);
                $http.jsonp('https://api.twitter.com/1/statuses/oembed.json?id=' + tweetId + '&callback=JSON_CALLBACK')
                    .then(function(ref) {
                        var tweet = '<div class="twitter embeds">' + ref.data.html + '</div>';
                        var markup = $compile(tweet)(scope);
                        el.append(markup);
                        loadTweets.loadAllWidgets();
                    });
            }
        };
    });