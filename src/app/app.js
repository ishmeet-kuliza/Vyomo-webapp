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

  if(window.location.hash === '#/' && window.location.pathname ===  '/') {
    window.location.hash = '';
  }

  $urlRouterProvider.otherwise( '/' );
}])

.run(['$rootScope', 'auth', '$state', function($rootScope, auth, $state) {

    $rootScope.section = "";
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if(auth.isAuthenticated()) {
        return;
      } else if(toState.name === 'checkoutCart') {  //redirect to login //Handle appointment
        event.preventDefault();
        auth.clearUser();
        $state.go('login');
      } else {
        auth.clearUser();
        return;
      }

    });

    //keep track of previous states
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
      $state.previous = fromState;
      if(toState.name !== 'login' && toState.name !== 'signup') {
        $rootScope.previousState = toState.name;
      }
    });
}])

.controller( 'AppCtrl', ['$window', '$scope', '$location', 'servicesPackagesCacheService','$anchorScroll','cart','$rootScope',
                      function AppCtrl ( $window, $scope, $location, servicesPackagesCacheService, $anchorScroll, cart,$rootScope ) {
  $window.console.debug('This is our app', app);
  $scope.vyomoContactNo = "1800-102-8454";
  $scope.toggleNavMenuMobile = false;

  getAllServices();

  // This is a functions that scrolls to #{blah}link
  //function goToByScroll(id){
  //  // Remove "link" from the ID
  //  id = id.replace("link", "");
  //  // Scroll
  //  $('html,body').animate({
  //        scrollTop: $("#"+id).offset().top},
  //      'slow');
  //}
  $scope.$on('$stateChangeSuccess', function(event, toState){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = 'Vyomo |' + toState.data.pageTitle ;
    }
    //Redirection to particular section of page
    if(toState.name === "homePage"){
      if($rootScope.section !== ""){
        window.setTimeout(function(){
          $location.hash($rootScope.section);
          $anchorScroll();
        },300);
      }
    }
    if(toState.name === "servicesPage"){
      if(!cart.getCity()) {  //City not selected scroll to city selection
        $location.hash("citySelectBox");
        // call $anchorScroll()
        $anchorScroll();
      }else{
        if($rootScope.section !== ""){
          window.setTimeout(function(){
            $location.hash($rootScope.section);
            $anchorScroll();
          },300);
        }
      }
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

