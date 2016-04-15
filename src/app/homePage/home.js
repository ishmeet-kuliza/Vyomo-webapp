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
angular.module( 'vyomo.homePage', [
  'ui.router',
  'ui.bootstrap'
])

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController() {
})
// Include service to fetch packages
.controller('HomePackageCtrl',['$scope', 'servicesPackagesCacheService', function HomePackageController($scope, servicesPackagesCacheService){
  var cache = servicesPackagesCacheService.getCache();
  if(!Object.keys(cache).length) { //if cache is not set
    servicesPackagesCacheService.setCache().then(function(response){
      $scope.packageList = response['packages']['featured'];
    });
  } else {
    $scope.packageList = cache['packages']['featured'];
  }
  $scope.viewMorePackagesUrl = "/abc";
}])

// Include service to fetch Vyom Services
.controller('HomeServiceCtrl', ['$scope', 'servicesPackagesCacheService', 
                                function HomeServiceController($scope, servicesPackagesCacheService){
  var cache = servicesPackagesCacheService.getCache();
  if(!Object.keys(cache).length) { //if cache is not set
    servicesPackagesCacheService.setCache().then(function(response){
      $scope.servicesList = response['services']['featured'];
    });
  } else {
    $scope.servicesList = cache['services']['featured'];
  }
  $scope.viewMoreServicesUrl = "/abc";
}])
//Offers section controller
.controller( 'HomeOffersCtrl', function HomeOffersController( ) {
})

//Offers section controller
.controller( 'HomeReviewsCtrl', ['$scope', function HomeReviewsController( $scope ) {
  $scope.myInterval = 3000;
  $scope.reviews = [
    {
      customerName : "Astha Goel",
      description : "Amazing app!!! Great job..kudos to the developers .loved it so much ! Very useful",
      rating: 5
    },
    {
      customerName : "Hinal Nayak",
      description : "Excellent service! Lily and Kashifa was really professional and good in their service and attitude. Superb work. Thanks.",
      rating: 5
    },
    {
      customerName : "PeMa Dolma",
      description : "Simply love it vyomo!! Manesha is just so good n frank,I like the way she behave and handle clients and her service is so good,excellent.",
      rating: 5
    },
    {
      customerName : "Archi mohan",
      description : "Loved the app and the service..The head oil massage by Komati was awesome! I wish I could get this done every other day!",
      rating: 5
    },
    {
      customerName : "Punita Verma",
      description : "Excellent ! Excellent home beauty service !",
      rating: 5
    },
    {
      customerName : "Asma Abid ali",
      description : "Awesome work! Makeup artist is good by nature I really like that work and most important their timing they was coming on time.",
      rating: 4
    }

  ];
}])

//Careers section controller
.controller( 'HomeCareersCtrl', function HomeCareersController( ) {

});



