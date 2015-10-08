'use strict';

/**
 * @ngdoc directive
 * @name immersiveAngularApp.directive:blockImage
 * @description
 * # blockImage
 */
angular.module('immersiveAngularApp')
    .directive('blockVideo', function($sce, $compile) {
        return {
            template: '<div></div>',
            restrict: 'E',
            scope: {
                parameters: '='
            },
            link: function postLink(scope, elem) {
                var getEmbedVideoURL = function(url) {
                    var domains, i, id, kv, len, m, netloc, params, paramsStr, parser, path, ref;
                    domains = {
                        'www.youtube.com': 'youtube',
                        'youtu.be': 'youtube',
                        'vimeo.com': 'vimeo',
                        'deredactie.be': 'deredactie'
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
                    }
                    switch (domains[netloc]) {
                        case 'youtube':
                            if (path.toLowerCase() === '/watch') {
                                if (!params.v) {
                                    return null;
                                }
                                id = params.v;
                            } else {
                                m = path.match(/\/([A-Za-z0-9_-]+)$/i);
                                if (!m) {
                                    return null;
                                }
                                id = m[1];
                            }
                            return "https://www.youtube.com/embed/" + id;

                        case 'vimeo':
                            m = path.match(/\/(\w+\/\w+\/){0,1}(\d+)/i);
                            if (!m) {
                                return null;
                            }
                            return "https://player.vimeo.com/video/" + m[2];

                        case 'deredactie':
                            m = path.match(/\/(\D+)(.+)/i);
                            if (!m) {
                                return null;
                            }
                            return "http://deredactie.be/static/embed/?permalink=" + m[2];
                    }
                    return null;
                };




                scope.$watch('parameters.url', function(newValue, oldValue) {
                    if (newValue) {
                        var videoUrl = getEmbedVideoURL(newValue);
                        if (scope.parameters.filename) {
                            var template = '<div class="o-block__video--full"><video src=" ' + scope.parameters.url + ' " controls>Your browser does not support the <code>video</code> element.</video></div>';
                            var compiled = $compile(template)(scope);
                            elem.empty().append(compiled);

                        } else if (videoUrl && !scope.parameters.filename) {
                            var source = $sce.trustAsResourceUrl(videoUrl);
                            var template = '<div class="o-block__video--full youtube embeds"><iframe  src="' + source + '" frameborder="0" allowfullscreen></iframe></div>';
                            var compiled = $compile(template)(scope);
                            elem.empty().append(compiled);
                        }
                    } else {
                      console.log('chilling');
                    }
                });



            }
        };
    });
