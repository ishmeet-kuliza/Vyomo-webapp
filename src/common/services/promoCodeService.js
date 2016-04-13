/**
 *  Services/ Factory for add and get address
 *  @author/ Ekluv-Dev
 */

 angular.module('Vyomo')
  .factory('promoCode', ['$http', 'cart', 'auth', 'env', function($http, cart, auth, env){
        var promoCode = {};
        var BASE_URL = env.BASE_URL;
        promoCode.verify_code = function(code){
            var accessToken = env.getUser().sessionToken;
            var postData = {
                service_ids: cart.getItems(),
                access_token: accessToken,
                promotional_code: code,
                when: ''
            };

            return $http({
                method: 'POST',
                data: postData,
                url: BASE_URL + '/verify_promotional_code'
            });
        };
  return promoCode;
}]);