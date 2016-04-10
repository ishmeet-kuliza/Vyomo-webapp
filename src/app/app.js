var app = angular.module( 'Vyomo', [
  'templates-app',
  'templates-common',
  'vyomo.homePage',
  'vyomo.servicesPage',
  'ui.router',
  'ui.bootstrap',
  'navBarCtrl'
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
      window.console.log('This is the toState', toState);
    //   var user = auth.getUser();

    //   if (auth.isAuthenticated()) {
    //     if (user.forgotPassword) {
    //       // CHANGE PASSWORD FLAG SET
    //       event.preventDefault();
    //     } else {  
    //       $state.go("/");
    //     }
    //   } else if (toState.name !== 'login' && toState.name.indexOf('signup') < 0) {
    //     // auth.setEntryURL(window.location.pathname + window.location.search);
    //     // event.preventDefault();
    //     // $state.go('login');
    //     //Handle this.
    //     window.console.log('This user is not authenticated');
    //   }
    });

    //keep track of previous states
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
      $state.previous = fromState;
    });
}])

.controller( 'AppCtrl', ['$window', '$scope', '$location', function AppCtrl ( $window, $scope, $location ) {
  $window.console.debug('This is our app', app);
  $scope.imgPath = "assets/img/";
  $scope.vyomoContactNo = "1800-102-8454";
  $scope.toggleNavMenuMobile = false;

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

}]);

