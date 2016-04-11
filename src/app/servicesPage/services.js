/**
 * Services Module
 */

angular.module( 'vyomo.servicesPage', [
    'ui.router',
    'ui.bootstrap'
])

    /**
     * And of course we define a controller for our route.
     */
    .controller( 'ServiceCtrl', ['$scope', '$state', 'vyomoAPIservice', 'globals', 'cart', function ServiceController( $scope,$state, vyomoAPIservice, globals, cart) {
        $scope.cartProducts = [];
        $scope.citySelected = false;
        $scope.data = globals.getCities();

        function _sortAccordingtoPrice(packagesList) {
            return packagesList.sort(function (a, b) {
                                a = parseInt(a.cost, 10);
                                b = parseInt(b.cost, 10);
                                return (a - b);
                            });
        }

        function addToCart(){
            if(this.quantity !== undefined){
                this.quantity += 1;
            }
            cart.addItem(this);
        }

        function removeFromCart(){
            if(this.quantity){
                this.quantity -= 1;
            }
            cart.removeItem(this);
        }    
        // method for service objs to clear its occurences from cart
        function clearFromCart(){
            var quantity = this.quantity;
            if(quantity === 0){
                this.addToCart();
            }
            else if(quantity){
                for(var counter = 1; counter <= quantity; counter++){
                    this.removeFromCart();
                }
            }
        }

        function addQuantityProperty(service) {
            // default service quantity
            service.quantity = 0;
            service.addToCart = addToCart;
            service.removeFromCart = removeFromCart;
            service.clearFromCart = clearFromCart;
        }

        // fn to add a property isAddedToCart in package
        function addIsAddedToCartProperty(package){
            package.isAddedToCart = false;
            package.addToCart = addToCart;
            package.removeFromCart = removeFromCart;
        }

        // if product is in cart update cart price on reload
        function updateCartPrice(productInstance){
            if(cart.hasItem(productInstance)){
                // get item count from cart
                var quantity = cart.getItemCount(productInstance);
                cart.totalPrice += productInstance.cost * quantity;
                window.console.log(productInstance.service_id, cart.totalPrice);
            }
        }

        $scope.getServicesPackages = function() {
            if ($scope.data.selectedCity !== null) {
                $scope.citySelected = true;

                //API calling to get packages and services
                //var cityName = $scope.data.selectedCity;
                //var city = angular.element('.vm-select-city option:selected').attr('latLong');

                var cityElem = document.querySelector(".vm-select-city");
                var city = cityElem.options[cityElem.selectedIndex].value;
                // initiating cart for selected city
                cart.init(city);
                //API Call success method block
                vyomoAPIservice.getAllPackagesServices(city).success(function (response) {
                    $scope.packages = [];
                    $scope.services = [];
                    window.console.log(response);
                    if(response.hasOwnProperty("status_code")){
                        if(response.status_code === 200){
                            if (response.hasOwnProperty("message")) {
                                if (response.message.hasOwnProperty('packages')) {
                                    var packagesJson = response.message.packages;
                                    if(packagesJson.hasOwnProperty("all")){
                                        var allPackages = packagesJson.all;
                                        $scope.packages = _sortAccordingtoPrice(allPackages);
                                        window.console.log($scope.packages);
                                        // adding properties to package objs
                                        $scope.packages.forEach(function(package){
                                            addIsAddedToCartProperty(package);
                                            // if package is in cart update cart price
                                            updateCartPrice(package);
                                        });

                                    }

                                }

                                if (response.message.hasOwnProperty('services')) {
                                    var servicesJson = response.message.services;
                                    if(servicesJson.hasOwnProperty("all")){
                                        var allServices = servicesJson.all;
                                        $scope.categories = allServices;
                                        // adding properties to service objs
                                        $scope.categories.forEach(function(category){
                                            category.list.forEach(function(service){
                                                addQuantityProperty(service);
                                                // if service is in cart update cart price
                                                updateCartPrice(service);
                                            });
                                        });
                                        window.console.log($scope.categories);
                                       
                                    }
                                }

                            }
                        }
                    }

                });
                $state.go('servicesPage.list');
            }
        };
    
    }])

    .controller( 'ServicePackageCtrl',['$scope', function ServiceController($scope) {

        $scope.addOrRemovePackage = function(package){
            // add package to cart if it is not
            if(!package.isAddedToCart){
                package.addToCart();
            }
            else{
                package.removeFromCart();
            }
        };
    }])

    .controller( 'ServiceListCtrl',['$scope', function ServiceController( $scope) {
        //For each service sub list of its types, collapsed flag
        $scope.isCollapsed = true;

        //Function Call Attach on change event of service list checkbox

    }]);