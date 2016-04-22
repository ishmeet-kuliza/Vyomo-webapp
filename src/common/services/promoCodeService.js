/**
 *  Services/ Factory for promo code
 *  @author/ Ekluv-Dev
 */

 angular.module('Vyomo')
  .factory('promoCodeService', ['$http', 'cart', 'auth', 'env', '$q', function($http, cart, auth, env, $q){
        var promoCode = {code: ''};
        var BASE_URL = env.BASE_URL;
        promoCode.verifyCode = function(code, when){
            var self = this;
            var accessToken = auth.getUser().sessionToken;
            var postData = {
                service_ids: cart.getAllItems().toString(),
                access_token: accessToken,
                promotional_code: code,
                when: when //format = 'YYYY-MM-DD HH:mm'
            };
            var url = BASE_URL + '/verify_promotional_code';
            var deferred = $q.defer();
            $http.post(url, postData).then(function(response){
                if(response && response.data && response.data.status_code === 200){
                    if(response.data.message){
                        var costAfterPromo = response.data.message.cost_after_promo;
                        self.code = code;
                        deferred.resolve(costAfterPromo);
                    }
                }
                else{
                    self.code = '';
                    deferred.reject(response.data.error_message);
                }
            },function(error){
                self.code = '';
                deferred.reject(error);
            });
            return deferred.promise;
        };

        promoCode.removePromoCode = function() {
            this.code = '';
        };

  return promoCode;
}]);