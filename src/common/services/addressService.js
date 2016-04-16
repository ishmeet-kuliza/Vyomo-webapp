/**
 *  Services/ Factory for add and get address
 *  author/ Ekluv-Dev
 */
angular.module('Vyomo')
    .factory('addressService', ['$http', 'env', 'auth', '$q', function($http, env, auth, $q){
	
        var address = {};
        var BASE_URL = env.BASE_URL;
        var user = auth.getUser();
        var accessToken = user.sessionToken ;

        // method to call api for fetching all user addresses
        address.getAllUserAddress = function(){
            var postData = {access_token: accessToken};
            var url = BASE_URL + '/get_all_address';
            var deferred = $q.defer();
            $http.post(url, postData).then(function(response){
                if(response && response.data && response.data.status_code === 200){
                    deferred.resolve(response.data.message);
                }
                else{
                    deferred.reject(response.data.error_message);
                }
            },function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        };

        // method to call api for submitting user address
        address.addUserAddress = function(addressObj) {
            var postData = {
                access_token: accessToken,
                address: addressObj.address,
                landmark: addressObj.landmark,
                latitude: addressObj.latitude,
                longitude: addressObj.longitude,
                city: addressObj.city
            };
            var deferred = $q.defer();
            var url = BASE_URL + '/add_address';
            $http.post(url, postData).then(function(response){
                if(response && response.data && response.data.status_code === 200){
                    deferred.resolve(response.data.message.address_id);
                }
                else {
                    deferred.reject(response.data.error_message);
                }
            },function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        };

        // method to call api to delete user address
        address.deleteUserAddress = function(addressObj){
            var postData = {
                access_token: accessToken,
                address_id: addressObj.address_id
            };
            var deferred = $q.defer();
            var url = BASE_URL + '/delete_address';
           $http.post(url, postData).then(function(response){
                if(response && response.data && response.data.status_code ===200){
                    deferred.resolve(response.data.message);
                }
                else{
                    deferred.reject(response.data.error_message);
                }
           },function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        };

        return address;
}]);