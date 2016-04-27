/**
 *  Services/ Factory for products
 *  author/ Ekluv-Dev
 */
angular.module('Vyomo')
	.factory('productObjects', ['cart', function(cart){
        var productObjects = {};

        function addToCart(){
            if(this.count !== undefined){
                this.count += 1;
            }
            cart.addItem(this);
        }

        function removeFromCart(canClearCart){
            if(this.count>1){
                this.count -= 1;
                cart.removeItem(this);
            }
            else if(canClearCart){
                this.count -= 1;
                cart.removeItem(this);
            }

        }    
        // method for service objs to clear its occurences from cart
        function clearFromCart(){
            var count = this.count;
            if(count === 0){
                this.addToCart();
            }
            else if(count){
                for(var counter = 1; counter <= count; counter++){
                    this.removeFromCart(true);
                }
            }
        }

        function addCountProperty(product) {
            // default product quantity
            // product.count = product.count ? product.count: cart.getItemCount(product);
            product.count = cart.getItemCount(product);
            // if(product.count){
            //     getItemCount
            // }
            // product.count
            product.addToCart = addToCart;
            product.removeFromCart = removeFromCart;
            product.clearFromCart = clearFromCart;
        }

        // // fn to add a property isAddedToCart in package
        // function addIsAddedToCartProperty(package){
        //     package.isAddedToCart = false;
        //     package.addToCart = addToCart;
        //     package.removeFromCart = removeFromCart;
        // }

        productObjects.setProductObject = function(product){
            addCountProperty(product);
        };


        return productObjects;
    }]);