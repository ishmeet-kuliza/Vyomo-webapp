/**
 *  Services/ Factory for fetching api data
 *  @author Gaurav
 */

angular.module( 'Vyomo')

    .factory('vyomoAPIservice', ['$http', function($http) {
        var vyomoAPI = {};

        vyomoAPI.getAllPackagesServices = function(city) {
            var postData = {
                            "city":city,
                            "what" : 2
                            };
            return $http({
                method: 'POST',
                data:postData,
                url: 'http://54.165.181.161:3001/web/get_all_services'
            });
        };

        return vyomoAPI;
    }]);