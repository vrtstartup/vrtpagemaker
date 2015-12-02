'use strict';

angular.module('immersiveAngularApp')
    .directive('editVideo', function($sce, $compile) {
        return {
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




                scope.$watch('parameters.url', function(newValue) {
                    if (newValue) {
                        var videoUrl = getEmbedVideoURL(newValue);
                        var template;
                        var compiled;
                        if (scope.parameters.client) {
                            console.log('self hosted video');
                            template = '<div class="{{style}}"><figure class="{{parameters.filter}}"><video src=" ' + scope.parameters.url + ' " controls>Your browser does not support the <code>video</code> element.</video></figure></div>';
                            compiled = $compile(template)(scope);
                            elem.empty().append(compiled);

                        } else if (videoUrl && !scope.parameters.client) {
                            console.log('embedded video');
                            var source = $sce.trustAsResourceUrl(videoUrl);
                            template = '<div class="{{style}}"><div class="o-video__player youtube embeds"><iframe  src="' + source + '" frameborder="0" allowfullscreen></iframe><figure class="{{parameters.filter}}"></figure></div></div>';
                            compiled = $compile(template)(scope);
                            elem.empty().append(compiled);
                        }
                    } else {
                        console.log('chilling');
                    }
                });


                scope.$watch('parameters.css', function(newValue) {
                    if (newValue) {
                        scope.style = 'u-width--' + newValue;
                    } else {
                        scope.style = 'u-width--normal';
                    }
                });




            }
        };
    });
