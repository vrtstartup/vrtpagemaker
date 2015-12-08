(function() {
    'use strict';

    angular
        .module('immersiveAngularApp')
        .directive('storyHeader', storyHeader);

    function storyHeader() {
        var directive = {
            restrict: 'E',
            templateUrl: 'views/storyheader.html',
            scope: {
                image: '=',
                title: '=',
                author: '=',
                brand: '=',
                refer: '='
            },
            link: scroller
        };

        return directive;
    }

    function scroller() {
        document.addEventListener('scroll', onScroll);

        var header = document.getElementsByTagName('header')[0];
        var nav = document.getElementById('nav');
        var title = document.getElementById('title');

        function onScroll() {
            var scrollPosition = window.pageYOffset;

            if (scrollPosition > header.clientHeight) {
                if (nav.className.indexOf(' show') < 0) {
                    nav.className += ' show';
                }

                title.style.marginTop = '55px';
            } else {
                nav.className = nav.className.replace(' show', '');
                title.style.marginTop = '20px';
            }
        }
    }
})();
