'use strict';

angular.module('immersiveAngularApp')
    .service('toolsUrlprocessing', function($q) {

        this.processIframe = function(iframe) {
            var deferred = $q.defer();

            function getUrl(value) {
                var regex1 = /<iframe.*?src="(.*?)"/;
                var regex2 = /<iframe.*?src='(.*?)'/;
                var parts = regex1.exec(value);
                var url;

                if (!parts) {
                    parts = regex2.exec(value);
                }

                if (parts) {
                    url = parts[1];
                } else {
                    url = value;
                }
                deferred.resolve(url);
            }

            getUrl(iframe);

            return deferred.promise;
        };



        this.processVideo = function(video) {
            var deferred = $q.defer();

            var getEmbedVideoURL = function(url) {
                var domains, i, id, kv, len, m, netloc, params, paramsStr, parser, path, ref;
                domains = {
                    'www.youtube.com': 'youtube',
                    'youtu.be': 'youtube',
                    'vimeo.com': 'vimeo',
                    'deredactie.be': 'deredactie',
                    'sporza.be': 'sporza',
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

                        deferred.resolve({
                            url: 'https://www.youtube.com/embed/' + id,
                            host: 'youtube'
                        });
                        break;

                    case 'vimeo':
                        m = path.match(/\/(\w+\/\w+\/){0,1}(\d+)/i);
                        if (!m) {
                            return null;
                        }

                        deferred.resolve({
                            url: 'https://player.vimeo.com/video/' + m[2],
                            host: 'vimeo'
                        });
                        break;

                    case 'deredactie':
                        m = path.match(/\/(\D+)(.+)/i);

                        if (!m) {
                            return null;
                        }

                        deferred.resolve({
                            url: 'http://deredactie.be/static/embed/?permalink=' + m[2],
                            host: 'deredactie'
                        });

                        break;

                    case 'sporza':
                        m = path.match(/\/(\D+)(.+)/i);

                        if (!m) {
                            return null;
                        }

                        deferred.resolve({
                            url: 'http://sporza.be/static/embed/?permalink=' + m[2],
                            host: 'sporza'
                        });

                        break;

                }
                deferred.resolve({
                    url: video,
                    host: 'unknown'
                });
            };

            getEmbedVideoURL(video);

            return deferred.promise;
        };

    });
