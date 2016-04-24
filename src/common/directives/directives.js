
angular.module('Vyomo').directive('initializePage',['$window', function($window){
    return {
        restrict: 'AE',


        link: function(scope) {
            var resizing = false,
                scrolling = false;
            var window = angular.element($window);
            var topNavigation = angular.element('.vm-top-nav'),
                sidebar = angular.element('.vm-side-nav'),
                mainContent = angular.element('.vm-main-content'),
                header = angular.element('.vm-main-header');

            scope.checkMQ =function() {
                //check if mobile or desktop device
                return window[0].getComputedStyle(document.querySelector('.vm-main-content'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
            };

            scope.moveNavigation = function() {
                var mq = scope.checkMQ();

                if (mq === 'mobile' && !sidebar.length) {
                    detachElements();
                    topNavigation.appendTo(sidebar);
                } else if (( mq === 'tablet' || mq === 'desktop') && sidebar.length > 0) {
                    detachElements();
                    topNavigation.appendTo(header.find('.vm-nav'));
                }
                checkSelected(mq);
                resizing = false;
            };

            function detachElements() {
                topNavigation.detach();
            }

            function checkSelected(mq) {
                //on desktop, remove selected class from items selected on mobile/tablet version
                if (mq === 'desktop') {
                    angular.element('.has-children.selected').removeClass('selected');
                }
            }
            scope.checkScrollbarPosition = function() {
                var mq = scope.checkMQ(),
                    sidebarHeight = sidebar.outerHeight(),
                    windowHeight = window.height(),
                    mainContentHeight = mainContent.outerHeight(),
                    scrollTop = window.scrollTop();

                if( mq !== 'mobile'  ) {
                    if(( scrollTop + windowHeight > sidebarHeight ) && ( mainContentHeight - sidebarHeight)) {
                        sidebar.addClass('is-fixed').css('bottom', 0);
                    } else {
                        sidebar.removeClass('is-fixed').attr('style', '');
                    }
                }

                scrolling = false;
            };


            window.bind('resize', function () {

                if (!resizing) {
                    if(!window.requestAnimationFrame) {
                        window[0].setTimeout(scope.moveNavigation, 300);
                    } else {
                        window.requestAnimationFrame(scope.moveNavigation);
                    }
                    resizing = true;
                }
            });

            scope.goToOffers = function() {
                $('body').animate({
                    scrollTop: $('#offers').offset().top
                }, 2000);
            };
        }
    };
}]);

