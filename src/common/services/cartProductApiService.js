/**
 *  Services/ Factory for fetching cart products from api
 *  author/ Ekluv-Dev
 */
angular.module('Vyomo')
    .factory('cartProduct', ['cart', '$http', function(cart, $http){
        var cartProduct = {};
    // TODO Change url to base/env url ina ll api calls
        cartProduct.getCartProducts = function(){
                var items = cart.getAllItems().toString();
                var postData = {city: cart.getCity(),
                    what: 2,
                    service_ids: items
                };
                return $http({
                    method: 'POST',
                    data: postData,
                    url: 'http://52.5.1.82:3001/web/get_all_services'
                });

            };
        return cartProduct;
    }]);