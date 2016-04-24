/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
angular.module('Vyomo')
.config(['$stateProvider', function config( $stateProvider ) {

  //Home Page states
  $stateProvider.state( 'homePage', {
    url: '/:section',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: '/src/app/homePage/views/home.tpl.html'
      },
      "homeFeaturePackage@homePage" :{
        controller: 'HomePackageCtrl',
        templateUrl: '/src/app/homePage/views/packages.tpl.html'
      },
      "homeFeatureService@homePage" :{
        controller: 'HomeServiceCtrl',
        templateUrl: '/src/app/homePage/views/services.tpl.html'
      },
      "homeOffers@homePage" :{
        controller: 'HomeOffersCtrl',
        templateUrl: '/src/app/homePage/views/offers.tpl.html'
      },
      "homeCustomerReviews@homePage" : {
        controller: 'HomeReviewsCtrl',
        templateUrl: '/src/app/homePage/views/reviews.tpl.html'
      },
      "homeCareers@homePage" : {
        controller : 'HomeCareersCtrl',
        templateUrl: '/src/app/homePage/views/careers.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });

  //Service Page
  $stateProvider.state( 'servicesPage', {
      url: '/servicesPage/:section',
      views: {
          "main": {
              controller: 'ServiceCtrl',
              templateUrl: '/src/app/servicesPage/views/services.tpl.html'
          }
      },
      data:{ pageTitle: 'Beauty Services'}
    }).state('servicesPage.list',{
        url : "/list",
        views : {
            "packagesView":{
                controller : 'ServicePackageCtrl',
                templateUrl : '/src/app/servicesPage/views/packageList.tpl.html'
            },
            "servicesView":{
                controller : 'ServiceListCtrl',
                templateUrl : '/src/app/servicesPage/views/serviceList.tpl.html'
            }
        }
    });

    $stateProvider.state( 'login', {
      url: '/login',
      views: {
          "main": {
              controller: 'loginCtrl',
              templateUrl: '/src/app/login/login.tpl.html'
          }
      },
      data:{ pageTitle: 'Login'}
    });

    $stateProvider.state('signup',{
        url : "/signup",
        views : {
            "main":{
                controller : 'signUpCtrl',
                templateUrl : '/src/app/login/signUp.tpl.html'
            }
        },
        data:{ 
          pageTitle: 'Signup', 
          otp: ''
        }
    });

  //Cart checkout Page
    $stateProvider.state('checkoutCart',{
        url : '/viewCart',
        views: {
            "main": {
                controller: 'CartCtrl',
                templateUrl: '/src/app/cart/views/viewCart.tpl.html'
            },
            "packageListCart@checkoutCart" : {

                templateUrl: '/src/app/servicesPage/views/packageList.tpl.html'
            },
            "serviceListCart@checkoutCart" : {
                templateUrl: '/src/app/servicesPage/views/serviceList.tpl.html'
            }
        },
        data:{ pageTitle: 'Cart' }
    }).state('checkoutCart.checkoutStep2',{
        url : "/checkout",
        views : {
            "checkoutView" : {
                controller : 'CartCheckoutCtrl',
                templateUrl : '/src/app/cart/views/checkout.tpl.html'
              },
            "addressView" : {
                controller : 'CartAddressCtrl',
                templateUrl : '/src/app/servicesPage/views/packageList.tpl.html'
            }
        }
    });

    $stateProvider.state( 'appointments', {
      url: '/appointments/:section',
      views: {
          "main": {
              controller: 'appointmentsCtrl',
              templateUrl: '/src/app/appointments/views/appointments.tpl.html'
          }
      },
      data:{
        pageTitle: 'Login',
        confirmBookingMsg: null
      },
      reloadOnSearch: false
    });

}]);
