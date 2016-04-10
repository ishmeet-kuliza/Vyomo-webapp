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
    .controller( 'ServiceCtrl', ['$scope', '$state', 'vyomoAPIservice','cart', function ServiceController( $scope,$state, vyomoAPIservice ,cart) {
        cart.init('products');
        $scope.cartProducts = [];
        $scope.citySelected = false;
        $scope.data = {
            selectedCity : null,
            cities:[
                {
                    name : "Bangalore",
                    lat_long : "12.9667,77.566"
                },
                {
                    name : "Delhi/NCR",
                    lat_long : "28.613,77.209"
                },
                {
                    name : "Mumbai",
                    lat_long : "18.975,72.825"
                }
            ]
        }; 

        function _sortAccordingtoPrice(packagesList) {
            return packagesList.sort(function (a, b) {
                                a = parseInt(a.cost, 10);
                                b = parseInt(b.cost, 10);
                                return (a - b);
                            });
        }


        function addToCart(){
            this.quantity += 1;
            cart.addItem(this);
        }

        function removeFromCart(){
            if(this.quantity !== 0){
                this.quantity -= 1;
            }
            cart.removeItem(this);
        }    

        function addQuantityProperty(productInstance) {
            // default product quantity
            // productinstance can be package or service
            productInstance.quantity= 0;
            productInstance.addToCart = addToCart;
            productInstance.removeFromCart = removeFromCart;
        }

        $scope.getServicesPackages = function() {
            if ($scope.data.selectedCity != null) {
                $scope.citySelected = true;

                //API calling to get packages and services
                //var cityName = $scope.data.selectedCity;
                //var city = angular.element('.vm-select-city option:selected').attr('latLong');

                var cityElem = document.querySelector(".vm-select-city");
                var city = cityElem.options[cityElem.selectedIndex].value;

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
                                            addQuantityProperty(package);
                                            // if package is in cart update cart price
                                            if(cart.hasItem(package)){
                                                cart.totalPrice += package.cost;
                                            }
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
                                                if(cart.hasItem(service)){
                                                    cart.totalPrice += service.cost;
                                                }
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
        
        $scope.isCheckPackage = true;
        
        $scope.addOrRemovePackage = function(package){
            window.console.log(package);
            if($scope.isCheckPackage){
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