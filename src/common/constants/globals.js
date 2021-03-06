angular.module('Vyomo')

.factory('globals', [ function() {
  var cities = {
      selectedCity : null,
      cities:[
          {
              name : "Bangalore",
              lat_long : "12.9667,77.566"
          },
          {
              name : "Delhi/NCR",
              lat_long : "28.613,77.209"
          },
          {
              name : "Mumbai",
              lat_long : "18.975,72.825"
          }
      ]
  }; 

  function getCities() {
    return cities;
  }

  return {
    getCities: getCities
  };
}]);
