/**
 *  Services/ Factory for fetching api data
 *  @author Gaurav
 */

angular.module( 'Vyomo')

    .factory('vyomoAPIservice', ['$http', 'env', function($http, env) {
        var vyomoAPI = {};
        var url = env.BASE_URL + '/get_all_services';
        vyomoAPI.getAllPackagesServices = function(city) {
            var postData = {
                            "city":city,
                            "what" : 2
                            };
            return $http({
                method: 'POST',
                data:postData,
                url: url
            });
        };

        return vyomoAPI;
    }]);