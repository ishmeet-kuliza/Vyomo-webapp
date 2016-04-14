/**
 *  Services/ Factory for promo code
 *  @author/ Ekluv-Dev
 */

 angular.module('Vyomo')
  .factory('promoCodeService', ['$http', 'cart', 'auth', 'env', '$q', function($http, cart, auth, env, $q){
        var promoCode = {};
        var BASE_URL = env.BASE_URL;
        promoCode.verifyCode = function(code){
            var accessToken = auth.getUser().sessionToken;
            var postData = {
                service_ids: cart.getAllItems().toString(),
                access_token: accessToken,
                promotional_code: code,
                when: '2016-04-15 13:00'
            };
            var url = BASE_URL + '/verify_promotional_code';
            var deferred = $q.defer();
            $http.post(url, postData).then(function(response){
                if(response && response.data && response.data.status_code === 200){
                    if(response.data.message){
                        var costAfterPromo = response.data.message.cost_after_promo;
                        deferred.resolve(costAfterPromo);
                    }
                }
                else{
                    deferred.reject(response.data.error_message);
                }
            },function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        };
  return promoCode;
}]);