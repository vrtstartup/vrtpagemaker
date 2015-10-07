'use strict';

/**
 * @ngdoc function
 * @name immersiveAngularApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the immersiveAngularApp
 */
angular.module('immersiveAngularApp')
    .controller('ArticleEditCtrl', function($scope, $routeParams, FBArticle, ngDialog, filepickerService, $window) {

        var FURL = 'https://immersiveangular.firebaseio.com/';

        FBArticle.get($routeParams.article, FURL)
            .then(function(obj) {
                obj.$bindTo($scope, "data");
            });


        $scope.list = FBArticle.list($routeParams.article, FURL);



        var reorderList = function() {
            var arrayLength = $scope.list.length;
            for (var i = 0; i < arrayLength; i++) {
                console.log($scope.list[i]);
                FBArticle.setPriority($routeParams.article, FURL, $scope.list[i].$id, i);
            }
        };


        $scope.dragControlListeners = {
            // accept: function (sourceItemHandleScope, destSortableScope) {return boolean},
            itemMoved: function(event) {
                console.log(event);

            },
            orderChanged: function(event) {
                    console.log(event);
                    reorderList();
                }
                // containment: '#board'//optional param.
                // clone: true //optional param for clone feature.
        };







        $scope.addBlock = function(type, parameters) {
            console.log('adding a block of type ' + type);
            FBArticle.add($routeParams.article, FURL, type, parameters).then(function() {});
        };


        $scope.saveEdit = function(type, parameters) {
            console.log('adding a block of type ' + type);
            FBArticle.add($routeParams.article, FURL, type, parameters).then(function() {});
        };




        $scope.editBlock = function(key, value) {
            console.log('editing ' + key);
            $scope.openDialog(value.type, key);
            $scope.block = value.parameters;
        };




        $scope.deleteBlock = function(key) {
            console.log('deleting ' + key);
            FBArticle.delete($routeParams.article, FURL, key).then(function(ref) {
                console.log('deleted ' + ref);
            });
        };



        var theDialog = function(template, type, key) {
            console.log(template);
            ngDialog.open({
                template: template,
                data: {
                    'type': type,
                    'key': key
                },
                scope: $scope
            });
        };


        $scope.openDialog = function(type, key) {

            var template;
            switch (type) {

                case 'text':
                    template = '../../blocks/text/textBlockDialog.html';
                    theDialog(template, type, key);
                    break;
                case 'image':
                    template = '../../blocks/image/imageBlockDialog.html';
                    theDialog(template, type, key);
                    break;
                case 'parallax':
                    template = '../../blocks/parallax/parallaxBlockDialog.html';
                    theDialog(template, type, key);
                    break;

                case 'video':
                    template = '../../blocks/video/videoBlockDialog.html';
                    theDialog(template, type, key);
                    break;

                case 'twitter':
                    template = '../../blocks/twitter/twitterBlockDialog.html';
                    theDialog(template, type, key);
                    break;

                case 'facebook':
                    template = '../../blocks/facebook/facebookBlockDialog.html';
                    theDialog(template, type, key);
                    break;

                case 'delete':
                    template = '../views/deleteDialog.html';
                    theDialog(template, 'delete', key);
                    break;

                default:
                    console.log('This dialog does not exist');
            }
        };




        $scope.files = JSON.parse($window.localStorage.getItem('files') || '[]');




        function onSuccess(Blob) {
            $scope.files.push(Blob);
            $window.localStorage.setItem('files', JSON.stringify($scope.files));
            console.log(Blob);
            $scope.block = Blob;
        }


        $scope.pickFile = function(type) {
            filepickerService.pick({
                    mimetype: type,
                    Language: 'nl'


                },
                onSuccess
            );

        };

        $scope.onSuccess = onSuccess;




    }).filter('toArray', function() {

        return function(obj) {
            if (!(obj instanceof Object)) {
                return obj;
            }

            return Object.keys(obj).map(function(key) {
                return Object.defineProperty(obj[key], '$key', {
                    __proto__: null,
                    value: key
                });
            });
        }
    });
