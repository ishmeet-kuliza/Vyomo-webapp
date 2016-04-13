/**
 *  Services/ Factory for add and get address
 *  @author/ Ekluv-Dev
 */

 angular.module('Vyamo')
 	.factory('promoCode', ['$http', 'cart', 'auth', 'env', function($http, cart, auth, env){
        var promoCode = {};
        BASE_URL = env.BASE_URL;
        promocode.verify_code = function(promoCode){
            var accessToken = user.getUser().sessionToken;
            var postData = {
                service_ids: cart.getItems(),
                access_token: accessToken,
                promotional_code: promoCode,
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