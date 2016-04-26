

angular.module('Vyomo').controller('headerController', ['$scope', '$log', 'auth', '$cookies', '$state', '$rootScope',
                                function($scope, $log, auth, $cookies, $state, $rootScope){

    $scope.status = {
        isopen: false
    };

    $scope.number = false;

    $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.$on('$stateChangeSuccess', function(){
        $scope.number = auth.getUser().number;
        $rootScope.toggleNavMenuMobile = false;
    });

    $scope.logout = function() {
        $cookies.remove('userObj');
        window.location = "/";
    };

    $scope.goToLogin = function() {
        $state.go('login');
    };


    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
}]);


angular.module('Vyomo').controller('sideMenuController', ['$scope', '$state','$location','$anchorScroll','$rootScope', '$timeout',
    function($scope, $state,$location,$anchorScroll,$rootScope, $timeout){
        $scope.isHome = true;

        $scope.goToOffers = function() {
            $scope.isHome = false;  //Flag for active class of home icon
           if($state.current.name === "homePage"){
                $timeout(function(){
                    $location.hash("offers");
                    $anchorScroll();
                });
           }else{
               $rootScope.section = "offers";
               $state.go('homePage');
           }
            $('.vm-home-nav').removeClass('active');
            $('.vm-aboutus-nav').removeClass('active');
            $('.vm-offers-nav').addClass('active');

        };

        $scope.goToAboutUs = function() {
            $scope.isHome = false;
            if($state.current.name === "homePage"){
                $timeout(function(){
                    $location.hash("aboutUs");
                    $anchorScroll();
                });
            }else{
                $rootScope.section = "aboutUs";
                $state.go('homePage');
            }
            $('.vm-home-nav').removeClass('active');
            $('.vm-offers-nav').removeClass('active');
            $('.vm-aboutus-nav').addClass('active');

        };

        function getPosition(str, m, i) {
           return str.split(m, i).join(m).length;
        }

        $scope.goToState = function(toState,params) {
        
            $('.vm-offers-nav').removeClass('active');
            $('.vm-aboutus-nav').removeClass('active');

            if(toState === "homePage"){

                $rootScope.section = "";
                $scope.isHome = true;
                var url = window.location.toString();
                var clean_uri = url.substring(0, getPosition(url, "/", 1)); //Cleans the url
                window.history.replaceState({}, document.title, clean_uri);
                $timeout(function(){
                    $location.hash("home");
                    $anchorScroll();
                });
            }else{
                $scope.isHome = false;
            }

            if($state.current.name.indexOf(toState) > -1) {
               return;
            }

            if(params){
                $rootScope.section = params.section;
            }
                $state.go(toState);

        };

    }]);