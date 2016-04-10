/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
angular.module('Vyomo')
.config(['$stateProvider', function config( $stateProvider ) {

  //Home Page states
  $stateProvider.state( 'homePage', {
    url: '/',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'homePage/views/home.tpl.html'
      },
      "homeFeaturePackage@homePage" :{
        controller: 'HomePackageCtrl',
        templateUrl: 'homePage/views/packages.tpl.html'
      },
      "homeFeatureService@homePage" :{
        controller: 'HomeServiceCtrl',
        templateUrl: 'homePage/views/services.tpl.html'
      },
      "homeOffers@homePage" :{
        controller: 'HomeOffersCtrl',
        templateUrl: 'homePage/views/offers.tpl.html'
      },
      "homeCustomerReviews@homePage" : {
        controller: 'HomeReviewsCtrl',
        templateUrl: 'homePage/views/reviews.tpl.html'
      },
      "homeCareers@homePage" : {
        controller : 'HomeCareersCtrl',
        templateUrl: 'homePage/views/careers.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });

  //Service Page
  $stateProvider.state( 'servicesPage', {
      url: '/servicesPage',
      views: {
          "main": {
              controller: 'ServiceCtrl',
              templateUrl: 'servicesPage/views/services.tpl.html'
          }
      },
      data:{ pageTitle: 'Beauty Services'}
    }).state('servicesPage.list',{
        url : "/list",
        views : {
            "packagesView":{
                controller : 'ServicePackageCtrl',
                templateUrl : 'servicesPage/views/packageList.tpl.html'
            },
            "servicesView":{
                controller : 'ServiceListCtrl',
                templateUrl : 'servicesPage/views/serviceList.tpl.html'
            }
        }
    });

    $stateProvider.state( 'login', {
      url: '/login',
      views: {
          "main": {
              controller: 'loginCtrl',
              templateUrl: 'login/login.tpl.html'
          }
      },
      data:{ pageTitle: 'Login'}
    }).state('login.signup',{
        url : "/signup",
        views : {
            "signUp":{
                controller : 'signUpCtrl',
                templateUrl : 'login/signUp.tpl.html'
            }
        }
    });

}]);
