/**
 *  Services/ Factory for fetching api data
 *  @author Gaurav
 */

angular.module( 'Vyomo')

    .factory('vyomoAPIservice', ['$http', 'env', function($http, env) {
        var vyomoAPI = {};
        var BASE_URL = env.BASE_URL;
        vyomoAPI.getAllPackagesServices = function(city) {
            var postData = {
                            "city":city,
                            "what" : 2
                            };
            return $http({
                method: 'POST',
                data:postData,
                url: 'http://52.5.1.82:3001/web/get_all_services'
            });
        };

        return vyomoAPI;
    }]);