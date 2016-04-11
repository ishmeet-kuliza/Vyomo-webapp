/**
 * Each section of the site has its own module. It probably also has
 * submodules. Within `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'vyomo.cart', [
        'ui.router',
        'ui.bootstrap'
    ])

    /**
     * And of course we define a controller for our route.
     */
    .controller( 'CartCtrl',['$scope','cartProduct','cart' , function CartController( $scope, cartProduct,cart) {

        $scope.isStep1Complete = "false";
        //Boolean used for hiding headers for packages  and service template used in view cart
        $scope.viewCart = true;
        $scope.packages = [];
        $scope.categories = [];
        //API Call success method block
        //When in cookies any item/cart is not present
        if(cart.getAllItems()){
            cartProduct.getCartProducts().success(function (response) {
                if(response.hasOwnProperty("message")){
                    if(response.message.hasOwnProperty("packages") && response.message.packages.all.length > 0){
                        $scope.packages =  response.message.packages.all;
                    }
                    if(response.message.hasOwnProperty("services") && response.message.services.all.length > 0){
                        //categories === services
                        $scope.categories =  response.message.services.all;
                    }
                }
            });
        }else{
            window.console.log("cart is empty");
        }
        //Function for save & continue and state change to checkoutStep2
    }]);