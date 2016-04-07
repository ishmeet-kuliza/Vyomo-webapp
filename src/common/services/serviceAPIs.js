/**
 *  Services/ Factory for fetching api data
 */

angular.module( 'vyomo.apis',[])

    .factory('vyomoAPIservice', function($http) {
        var vyomoAPI = {};

        vyomoAPI.getPackages = function(latLong) {
            var postData = {
                            "lat_long":latLong
                            };
            return $http({
                method: 'POST',
                data:postData,
                url: 'http://booking.vyomo.com:3001/get_nearby_stylists'
            });
        };

        return vyomoAPI;
    });