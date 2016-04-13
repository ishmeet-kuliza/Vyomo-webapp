/**
 *  Services/ Factory for add and get address
 *  author/ Ekluv-Dev
 */
angular.module('Vyomo')
    .factory('addressService', ['$http', 'env', 'auth', function($http, env, auth){
	
        var address = {};
        var BASE_URL = env.BASE_URL;
        var user = auth.get_user();
        var access_token = user.sessionToken ;
        // method to call api for fetching all user addresses
        address.getAllUserAddress = function(){

            var postData = {access_token: access_token};
            var url = BASE_URL + '/get_all_address';
            return $http({
                method: 'POST',
                data: postData,
                url: url
            });
        };

        // method to call api for submitting user address
        address.addUserAddress = function(address, landmark, latitude, longitude, city) {
            var postData = {
                access_token: access_token,
                address: address,
                landmark: landmark,
                latitude: latitude,
                longitude: longitude,
                city: city
            };
            var url = BASE_URL + '/add_address';
            return $http({
                method: 'POST',
                data: postData,
                url: url
            });
        };

        // method to call api to delete user address
        address.deleteUserAddress = function(address_id){
            var postData = {
                access_token: access_token,
                address_id: address_id
            };
            var url = BASE_URL + '/web/delete_address';
            return $http({
                method: 'POST',
                data: postData,
                url: url
            });
        };

}]);