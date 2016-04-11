var app = angular.module( 'Vyomo', [
  'templates-app',
  'templates-common',
  'vyomo.homePage',
  'vyomo.servicesPage',
  'vyomo.cart',
  'ui.router',
  'ui.bootstrap',
  'navBarCtrl',
  'ngCookies'
])

.config(['$stateProvider', '$urlRouterProvider', function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/' );
}])

.run( function run () {
})

.controller( 'AppCtrl', ['$window', '$scope', '$location', function AppCtrl ( $window, $scope, $location ) {
  $window.console.debug('This is our app', app);
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

