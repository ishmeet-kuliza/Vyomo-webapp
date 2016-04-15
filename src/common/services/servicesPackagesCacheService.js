/*
** Stores cache for services and packages
** author: @ishmeet
*/
angular.module('Vyomo')
.factory('servicesPackagesCacheService', ['env', '$http', 'cart', '$q', function(env, $http, cart, $q) {
	var servicesPackagesCache,
		api = '/get_all_services',
		city = cart.getCity() ? cart.getCity().toLowerCase() : 'bangalore';

	function setCache() {
		var deferred = $q.defer();
		var params = {
			'city': city,
			'what': 2
		};

		$http({method: 'POST', data: params, url: env.BASE_URL + api}).then(function(response){
			if(response && response.data && response.data.status_code === 200) {
				servicesPackagesCache = JSON.parse(JSON.stringify(response.data.message));	//Make a deep copy
			} else {
				servicesPackagesCache = {};
			}
			deferred.resolve(servicesPackagesCache);
		});

		return deferred.promise;
	}

	function getCache() {
		return servicesPackagesCache ? servicesPackagesCache : {};
	}



	return {
      setCache: setCache,
      getCache: getCache
    };
}]);