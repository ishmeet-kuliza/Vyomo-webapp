
angular.module('Vyomo')
    .controller( 'CartCtrl',['$scope','cartProduct','cart', 'productObjects' , function CartController( $scope, cartProduct,cart, productObjects) {
        $scope.isStep1Complete = "false";
        //Boolean used for hiding headers for packages  and service template used in view cart
        $scope.viewCart = true;
        $scope.packages = [];
        $scope.categories = [];
        //API Call success method block
        //When in cookies any item/cart is not present

        // if product is in cart update cart price on reload
        function updateCartPrice(productInstance){
            if(cart.hasItem(productInstance)){
                // get item count from cart
                var personCount = productInstance.count;
                cart.totalPrice += productInstance.cost * personCount;
                window.console.log(productInstance.service_id, cart.totalPrice);
            }
        }

        cart.init(cart.getCity());
        if(cart.getCount()){
            cartProduct.getCartProducts().success(function (response) {
                if(response.hasOwnProperty("message")){
                    if(response.message.hasOwnProperty("packages") && response.message.packages.all.length > 0){
                        $scope.packages = response.message.packages.all;
                        $scope.packages.forEach(function(package){
                            productObjects.setProductObject(package);
                            updateCartPrice(package);
                        });
                        window.console.log($scope.packages);
                    }
                    if(response.message.hasOwnProperty("services") && response.message.services.all.length > 0){
                        //categories === services
                        $scope.categories =  response.message.services.all;
                       $scope.categories.forEach(function(category){
                            category.list.forEach(function(service){
                                productObjects.setProductObject(service);
                                updateCartPrice(service);
                            });
                        });
                       window.console.log(cart);
                    }
                }
            });
        }else{
            window.console.log("cart is empty");
        }
        
        //Function for save & continue and state change to checkoutStep2
    }]);