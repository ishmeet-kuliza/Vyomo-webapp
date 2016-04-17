angular.module('Vyomo')

.factory('globals', ['$cookies', function($cookies) {
    var selectedCityName;
    if($cookies.getObject("city") !== undefined){
        selectedCityName = $cookies.getObject("city");
    }else{
        selectedCityName = null;
    }
  var cities = {

      selectedCity : selectedCityName,
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
  var blockUIMsg = '<h1><i class="fa fa-2x fa-spinner fa-spin" ></i>  Please Wait...</h1>';
  return {
    getCities: getCities,
    blockUIMsg: blockUIMsg
  };
}]);
