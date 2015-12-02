'use strict';

angular.module('immersiveAngularApp')
    .service('toolsUploaderService', function(filepickerService, $q) {

        this.uploadFile = function(type) {
            var deferred = $q.defer();
            function onSuccess(Blob) {
                deferred.resolve(Blob);
            }

            filepickerService.pick({
                    mimetype: type,
                    Language: 'nl'
                },
                onSuccess
            );

            return deferred.promise;
        };
    });
