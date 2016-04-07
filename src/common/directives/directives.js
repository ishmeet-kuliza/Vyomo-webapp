'use strict';

app.directive('initializePage',function($window){
    return {
        restrict: 'AE',


        link: function(scope, element, attrs) {
            var resizing = false,
                scrolling = false;
            var w = angular.element($window);
            var topNavigation = angular.element('.vm-top-nav'),
                sidebar = angular.element('.vm-side-nav'),
                mainContent = angular.element('.vm-main-content'),
                header = angular.element('.vm-main-header');

            scope.checkMQ =function() {
                //check if mobile or desktop device
                return window.getComputedStyle(document.querySelector('.vm-main-content'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
            };

            scope.moveNavigation = function() {
                var mq = scope.checkMQ();

                if (mq == 'mobile' && sidebar.length == 0) {
                    detachElements();
                    topNavigation.appendTo(sidebar);
                } else if (( mq == 'tablet' || mq == 'desktop') && sidebar.length > 0) {
                    detachElements();
                    topNavigation.appendTo(header.find('.vm-nav'));
                }
                checkSelected(mq);
                resizing = false;
            }

            function detachElements() {
                topNavigation.detach();
            }

            function checkSelected(mq) {
                //on desktop, remove selected class from items selected on mobile/tablet version
                if (mq == 'desktop') angular.element('.has-children.selected').removeClass('selected');
            }
            scope.checkScrollbarPosition = function() {
                var mq = scope.checkMQ();

                if( mq != 'mobile' ) {
                    var sidebarHeight = sidebar.outerHeight(),
                        windowHeight = w.height(),
                        mainContentHeight = mainContent.outerHeight(),
                        scrollTop = w.scrollTop();

                    ( ( scrollTop + windowHeight > sidebarHeight ) && ( mainContentHeight - sidebarHeight != 0 ) ) ? sidebar.addClass('is-fixed').css('bottom', 0) : sidebar.removeClass('is-fixed').attr('style', '');
                }
                scrolling = false;
            }

            w.bind('resize', function () {

                if (!resizing) {
                    (!w.requestAnimationFrame) ? setTimeout(scope.moveNavigation, 300) : w.requestAnimationFrame(scope.moveNavigation);
                    resizing = true;
                }
            });
        }
    }
});

