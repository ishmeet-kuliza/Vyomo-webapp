/**
 *  Services/ Factory for submit booking
 *  @author/ Ekluv-Dev
 */

angular.module('Vyomo')
    .factory('submitBookingService', ['cart', '$http', '$q', 'env', 'auth', 'promoCodeService', function(cart, $http, $q, env, auth, promoCodeService){
        var submitBooking = {};
        var BASE_URL = env.BASE_URL;
        var user = auth.getUser();
        var accessToken = user ? user.sessionToken : '';
        submitBooking.bookRequest = function(address_id, when){
            var code = promoCodeService.code;
            var postData = {
                access_token: accessToken,
                service_ids: cart.getAllItems() ? cart.getAllItems().toString(): '',
                address_id: address_id,
                when: when,//'2016-04-18 13:00',
                promotional_code: code
            };
            var url = BASE_URL + '/submit_booking_request';
            var deferred = $q.defer();
            $http.post(url, postData).then(function(response){
                if(response && response.data && response.data.status_code === 200){
                    deferred.resolve(response.data.message.display_message);
                }
                else{
                   deferred.reject(response.data.error_message); 
                }
            },function(error){
                deferred.reject(error);
            });
            return deferred.promise;
            };
        return submitBooking;

    }]);