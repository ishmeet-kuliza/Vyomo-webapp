/**
 * Each section of the site has its own module. It probably also has
 * submodules. Within `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'vyomo.home', [
  'ui.router',
    'ui.bootstrap'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/views/home.tpl.html'
      },
      "homeFeaturePackage@home" :{
        controller: 'HomePackageCtrl',
        templateUrl: 'home/views/packages.tpl.html'
      },
      "homeFeatureService@home" :{
        controller: 'HomeServiceCtrl',
        templateUrl: 'home/views/services.tpl.html'
      },
      "homeOffers@home" :{
        controller: 'HomeOffersCtrl',
        templateUrl: 'home/views/offers.tpl.html'
      },
      "homeCustomerReviews@home" : {
        controller: 'HomeReviewsCtrl',
        templateUrl: 'home/views/reviews.tpl.html'
      },
      "homeCareers@home" : {
        controller : 'HomeCareersCtrl',
        templateUrl: 'home/views/careers.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope ) {
})
// Include service to fetch packages
.controller('HomePackageCtrl', function HomePackageController($scope){
  //Dummy data for now, to be popuated by the packages retrieved from back end
  $scope.packageList = [
    {
      name : "Head to Toe",
      cost: 8600,
      imgName : 'headToToe',
      detail:"Hair Spa + Fruit Facial + Face threading + Normal Wax(full arms, legs and underarms) + Back Massage + Wine Pedicure + Wine manicure "
    },
    {
      name : "Relax Plus",
      cost : 2020,
      imgName : "relaxPlus",
      detail :"Get a real Fruit Facial with full body polish and full body massage"
    },
    {
      name : "Happy Hands & Feet",
      cost : 750,
      imgName : "handsFeet",
      detail :"Full Arms and full legs Normal Waxing, Manicure and Pedicure"
    }
  ];
  $scope.viewMorePackagesUrl = "/abc";
})

// Include service to fetch Vyom Services
    .controller('HomeServiceCtrl', function HomeServiceController($scope){
      //Dummy data for now, to be popuated by the packages retrieved from back end
      $scope.servicesList = [
        {
          name : "CRYSTEINE HAIR TREATMENT",
          imgName : "crystHairTreatMent"
        },
        {
          name : "REAL FRUIT FACIAL",
          imgName : "fruitFacial"
        },
        {
          name : "BODY POLISH",
          imgName : "bodyPolish"
        },
        {
          name : "CHOCOLATE WAXING",
          imgName : "chocWaxing"
        },
        {
          name : "DE-TAN",
          imgName : "deTan"
        },
        {
          name : "HAIR-SPA",
          imgName : "hairSpa"
        },
        {
          name : "PEDICURE",
          imgName : "pedicure"
        },
        {
          name : "HAIR COLORING",
          imgName : "haircolor"
        },
        {
          name : "MEHENDI",
          imgName : "mehendi"
        }
      ];
      $scope.viewMoreServicesUrl = "/abc";
    })
    //Offers section controller
    .controller( 'HomeOffersCtrl', function HomeOffersController( $scope ) {
    })

    //Offers section controller
    .controller( 'HomeReviewsCtrl', function HomeReviewsController( $scope ) {
      $scope.myInterval = 3000;
      $scope.reviews = [
        {
          customerName : "Astha Goel",
          description : "Amazing app!!! Great job..kudos to the developers .loved it so much ! Very useful",
          rating: 5,
        },
        {
          customerName : "Hinal Nayak",
          description : "Excellent service! Lily and Kashifa was really professional and good in their service and attitude. Superb work. Thanks.",
          rating: 5,
        },
        {
          customerName : "PeMa Dolma",
          description : "Simply love it vyomo!! Manesha is just so good n frank,I like the way she behave and handle clients and her service is so good,excellent.",
          rating: 5,
        },
        {
          customerName : "Archi mohan",
          description : "Loved the app and the service..The head oil massage by Komati was awesome! I wish I could get this done every other day!",
          rating: 5,
        },
        {
          customerName : "Punita Verma",
          description : "Excellent ! Excellent home beauty service !",
          rating: 5,
        },
        {
          customerName : "Asma Abid ali",
          description : "Awesome work! Makeup artist is good by nature I really like that work and most important their timing they was coming on time.",
          rating: 4,
        }

      ];
    })

    //Careers section controller
    .controller( 'HomeCareersCtrl', function HomeCareersController( $scope ) {

    });



