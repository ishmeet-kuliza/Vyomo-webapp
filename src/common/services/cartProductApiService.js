/**
 *  Services/ Factory for fetching cart products from api
 *  author/ Ekluv-Dev
 */
angular.module('Vyomo')
    .factory('cartProduct', ['cart', '$http', 'env', '$q', function(cart, $http, env, $q){
        var cartProduct = {};
        var BASE_URL  = env.BASE_URL;

        cartProduct.getCartProducts = function(){
            var items = cart.getAllItems().toString();
            var postData = {city: cart.getCity(),
                what: 2,
                service_ids: items
            };
            return $http({
                method: 'POST',
                data: postData,
                url: BASE_URL + '/get_all_services'
            });

        };

        cartProduct.getAppicableTaxes = function(when){
            var postData ={
                when: when,
                city: cart.getCity()
            };
            var url = BASE_URL + '/get_applicable_taxes';
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
        return cartProduct;
    }]);