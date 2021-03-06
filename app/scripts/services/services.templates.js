'use strict';


angular.module('immersiveAngularApp')
    .factory('templatesService', ['$q', function($q) {


        var brands = {
            '0': {
                'name': 'deredactie',
                'logo': 'deredactie.png',
                'css': 'default'
            },
            '1': {
                'name': 'karrewiet',
                'logo': 'karrewiet.png',
                'css': 'karrewiet'
            },
            '2': {
                'name': 'pano',
                'logo': 'panoLogoTransparent.png',
                'css': 'pano'
            }
        };


        return {


            getBrand: function(brand) {
                console.log(brand);
                var deferred = $q.defer();
                for (var key in brands) {
                    if (brands.hasOwnProperty(key)) {
                        if (brand === brands[key].name) {
                            console.log(brands[key]);
                            deferred.resolve(brands[key]);
                        }
                    }
                }
                return deferred.promise;
            },


            brands: function() {
                return brands;
            }






        };
    }]);