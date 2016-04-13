/**
 *  Services/ Factory for fetching cart products from api
 *  author/ Ekluv-Dev
 */
angular.module('Vyomo')
    .factory('cartProduct', ['cart', '$http', 'env', function(cart, $http, env){
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
        return cartProduct;
    }]);