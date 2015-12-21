'use strict';

angular.module('immersiveAngularApp')
    .service('toolsUploaderService', function(filepickerService, $q) {

        this.uploadFile = function(type) {
            var deferred = $q.defer();
            function onSuccess(Blob) {
                deferred.resolve(Blob);
            }

            filepickerService.pick({
                    imageQuality: 80,
                     imageMax: [2500, null],
                    mimetype: type,
                    Language: 'nl'
                },
                onSuccess
            );

            return deferred.promise;
        };

        this.uploadMultiple = function (type) {
            var deferred = $q.defer();

            function onSuccess(Blob) {
                deferred.resolve(Blob);
            }

            filepickerService.pickMultiple({
                    imageQuality: 80,
                    imageMax: [2500, null],
                    mimetype: type,
                    Language: 'nl'
                },
                onSuccess
            );

            return deferred.promise;
        };
    });
