'use strict';

angular.module('immersiveAngularApp')
    .directive('editMap', function(mapboxService, $timeout) {
        return {
            template: '<div class="o-map"><mapbox map-id="licyeus.i9pkgkg8" lat="47.643569" lng="-122.329453" on-reposition="mapMovedCallback" on-zoom="mapZoomedCallback" zoom="12" scale-to-fit></mapbox></div>',
            restrict: 'E',
            scope: {
                id: '=',
                article: '=',
                parameters: '='
            },

            link: function postLink(scope) {
                console.log('test');

                mapboxService.init({
                    accessToken: 'pk.eyJ1IjoibGljeWV1cyIsImEiOiJuZ1gtOWtjIn0.qaaGvywaJ_kCmwmlTSNyVw'
                });
                $timeout(function() {
                    var map = mapboxService.getMapInstances()[0];
                    //mapboxService.fitMapToMarkers(map);
                }, 100);




            }
        };
    });
