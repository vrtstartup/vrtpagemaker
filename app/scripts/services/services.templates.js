'use strict';


angular.module('immersiveAngularApp')
    .factory('templatesService', ['$q', function($q) {


        var brands = {
             '0': {
                'name': 'geen',
                'logo': 'main.png',
                'css': 'main'
            },
            '1': {
                'name': 'karrewiet',
                'logo': 'karrewiet.png',
                'css': 'karrewiet'
            },
            '2': {
                'name': 'deredactie',
                'logo': 'deredactie.png',
                'css': 'deredactie'
            }
        };


        return {


            getBrand: function(brand) {
                var deferred = $q.defer();
                for (var key in brands) {
                    if (brands.hasOwnProperty(key)) {
                        if (brand === brands[key].name) {
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
