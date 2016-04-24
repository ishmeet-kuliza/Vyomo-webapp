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
              name : "Chennai",
              lat_long : "13.0827, 80.2707"
          }
      ]
  }; 

  function getCities() {
    return cities;
  }

  function getDefaultCity() {
    return 'chennai';
  }

  var blockUIMsg = '<div class="loader-gif"><img src="assets/img/loader.gif" ></div>';
  return {
    getCities: getCities,
    blockUIMsg: blockUIMsg,
    getDefaultCity: getDefaultCity
  };
}]);
