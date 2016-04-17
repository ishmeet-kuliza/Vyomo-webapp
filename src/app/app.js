var app = angular.module( 'Vyomo', [
  'vyomo.homePage',
  'ui.router',
  'ui.bootstrap',
  'ngCookies'
])

.config(['$httpProvider', function($httpProvider) {
  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

  //Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.config(['$stateProvider', '$urlRouterProvider',
        function myAppConfig ( $stateProvider, $urlRouterProvider ) {

  // $locationProvider.html5Mode({ //Remove the hashtag in our URL's //Enable it later
  //   enabled: true,
  //   requireBase: false
  // });

  $urlRouterProvider.otherwise( '/' );
}])

.run(['$rootScope', 'auth', '$state', function($rootScope, auth, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if(auth.isAuthenticated()) {
        return;
      } else if(toState.name === 'checkoutCart') {  //redirect to login //Handle appointment
        event.preventDefault();
        $state.go('login');
      } else {
        return;
      }
    });

    //keep track of previous states
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
      $state.previous = fromState;
    });
}])

.controller( 'AppCtrl', ['$window', '$scope', '$location', 'servicesPackagesCacheService',
                      function AppCtrl ( $window, $scope, $location, servicesPackagesCacheService ) {
  $window.console.debug('This is our app', app);
  $scope.vyomoContactNo = "1800-102-8454";
  $scope.toggleNavMenuMobile = false;

  getAllServices();

  $scope.$on('$stateChangeSuccess', function(event, toState){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = 'Vyomo |' + toState.data.pageTitle ;
    }
  });
  $scope.routeIs = function(routeName) {
    if(routeName !== "/") {
      return $location.path().indexOf(routeName) > -1;
    } else {
      return $location.path() === routeName ;
    }
  };

  //Function to get all services and packages and then store that in a cache 
  function getAllServices() {
    servicesPackagesCacheService.setCache();
  }

}]);

