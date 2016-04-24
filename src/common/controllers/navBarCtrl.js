

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
        window.location.reload();
        $state.go('homePage');
    };

    $scope.goToLogin = function() {
        $state.go('login');
    };

    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
}]);


angular.module('Vyomo').controller('sideMenuController', ['$scope', '$state',
    function($scope, $state){
        $scope.isHome = true;

        $scope.goToOffers = function() {
            $scope.isHome = false;
           if($state.current.name === "homePage"){
               window.location.hash = "offers";
           }else{
               $state.go('homePage',{'section':'offers'});
           }
            $('.vm-home-nav').removeClass('active');
            $('.vm-offers-nav').addClass('active');

        };

        $scope.goToAboutUs = function() {
            $scope.isHome = false;
            if($state.current.name === "homePage"){
                window.location.hash = "aboutUs";
            }else{
                $state.go('homePage',{'section':'aboutUs'});
            }
            $('.vm-home-nav').removeClass('active');
            $('.vm-aboutus-nav').addClass('active');

        };

        $scope.goToState = function(toState,params) {
            $scope.isHome = true;
            if(toState === "homePage"){
                window.location = "/";
            }
            $('.vm-offers-nav').removeClass('active');
            $('.vm-aboutus-nav').removeClass('active');
            if(params){
                $state.go(toState,params);
            }else{
                $state.go(toState);
            }
        };

    }]);