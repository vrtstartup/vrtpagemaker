'use strict';

angular.module('immersiveAngularApp')
    .service('uploader', function(filepickerService, $q) {



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





// $scope.files = JSON.parse($window.localStorage.getItem('files') || '[]');

// function onSuccess(Blob) {
//     console.log('got the file');
//     $scope.files.push(Blob);
//     $window.localStorage.setItem('files', JSON.stringify($scope.files));
//     console.log(Blob);
//     obj.parameters = {
//         'url': Blob.url,
//         'client': Blob.url
//     };
// }
// $scope.pickFile = function(type) {
//     console.log('picking file of type ' + type);
//     console.log(filepickerService);
//     filepickerService.pick({
//             mimetype: type,
//             Language: 'nl'
//         },
//         onSuccess
//     );
// };
// $scope.onSuccess = onSuccess;
