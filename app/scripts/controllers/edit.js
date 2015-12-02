'use strict';

angular.module('immersiveAngularApp')
    .controller('EditCtrl', function($scope, $mdDialog, FBStory, $location) {


        /* Get  the article from the Firebase */
        function getArticles(place) {

            /*  Get the array of blocks */

            FBStory.getArray(place).then(function(list) {
                $scope.list = list;
            });

        }


        $scope.editArticle = function(article) {
            $location.path('/edit/' + article);

        };




        $scope.removeArticle = function(article) {
            console.log(article);
            FBStory.delete(article, 'staging');
            FBStory.delete(article, 'live');
        };



        /* Show the dialog */
        function showDialog($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                templateUrl: 'views/newDialog.html',
                clickOutsideToClose: true,
                scope: $scope
            });
        }

        var originatorEv;
        $scope.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        $scope.startStory = function(edit) {
            showDialog(edit);
            originatorEv = null;
        };


        $scope.createStory = function(title) {
            FBStory.add(title).then(function(id) {
                console.log(id);
                console.log($location);
                $location.path('/edit/' + id);
            });
        };


        getArticles('staging');


    });
