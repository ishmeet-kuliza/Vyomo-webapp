var app = angular.module( 'Vyomo', [
  'templates-app',
  'templates-common',
  'vyomo.home',
  'vyomo.about',
  'vyomo.services',
  'ui.router',
    'ui.bootstrap',
  'navBarCtrl'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.imgPath = "assets/img/";
  $scope.vyomoContactNo = "1800-102-8454";
  $scope.toggleNavMenuMobile = false;

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = 'Vyomo |' + toState.data.pageTitle ;
    }
  });
  $scope.routeIs = function(routeName) {
    if(routeName != "/")
      return $location.path().indexOf(routeName) > -1;
    else
      return $location.path() === routeName ;
  };

});

