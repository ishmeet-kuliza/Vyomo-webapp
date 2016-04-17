/**
 * Services Module
 */

angular.module( 'Vyomo')

    .controller( 'ServiceCtrl', ['$scope', '$state', 'vyomoAPIservice', 'globals', 'cart', 'productObjects', '$cookies', 'servicesPackagesCacheService', function ServiceController($scope, $state, vyomoAPIservice, globals, cart, productObjects, $cookies, servicesPackagesCacheService) {
        $scope.cartProducts = [];
        $scope.citySelected = false;
        $scope.data = globals.getCities();

        var city = $cookies.getObject('city');
        // if city is present in cookie, load it and getServices for that city
        if(city){
            $scope.data.selectedCity = city;
            getServicesPackages(city);
        }
        
        $scope.getServicesPackages = getServicesPackages;

        function _sortAccordingtoPrice(packagesList) {
            return packagesList.sort(function (a, b) {
                                a = parseInt(a.cost, 10);
                                b = parseInt(b.cost, 10);
                                return (a - b);
                            });
        }


        // if product is in cart update cart price on reload
        function updateCartPrice(productInstance){
            if(cart.hasItem(productInstance)){
                // get item count from cart
                var personCount = cart.getItemCount(productInstance);
                cart.totalPrice += productInstance.cost * personCount;
                window.console.log(productInstance.service_id, cart.totalPrice);
            }
        }

        $scope.setCollapseFlag = function() {
            if(!($scope.viewCart)){
                $scope.isCollapsed = !($scope.isCollapsed);
            }
        };

        function getServicesPackages(cityCookie) {
            if ($scope.data.selectedCity !== null) {
                $scope.citySelected = true;

                //API calling to get packages and services
                //var cityName = $scope.data.selectedCity;
                //var city = angular.element('.vm-select-city option:selected').attr('latLong');
                var city = null;
                // if city is not present in cookie
                if(!cityCookie){
                    var cityElem = document.querySelector(".vm-select-city");
                    city = cityElem.options[cityElem.selectedIndex].value;
                    // creating another cookie with stores selected city
                    $cookies.putObject('city',city);
                }
                else{ //if city is present
                    city = cityCookie;
                }
                // initiating cart for selected city
                cart.init(city);
                
                //API Call success method block
                var cache = servicesPackagesCacheService.getCache();
                if(!Object.keys(cache).length) {
                    vyomoAPIservice.getAllPackagesServices(city).success(function (response) {
                        $scope.packages = [];
                        $scope.services = [];
                        if(response.hasOwnProperty("status_code")){
                            if(response.status_code === 200){
                                if (response.hasOwnProperty("message")) {
                                    if (response.message.hasOwnProperty('packages')) {
                                        var packagesJson = response.message.packages;
                                        if(packagesJson.hasOwnProperty("all")){
                                            var allPackages = packagesJson.all;
                                            $scope.packages = _sortAccordingtoPrice(allPackages);
                                            // adding properties to package objs
                                            $scope.packages.forEach(function(package){
                                                productObjects.setProductObject(package);
                                                // if package is in cart update cart price
                                                updateCartPrice(package);
                                            });

                                        }

                                    }

                                    if (response.message.hasOwnProperty('services')) {
                                        var servicesJson = response.message.services;
                                        if(servicesJson.hasOwnProperty("all")){
                                            //categories ==== services provided by vyomo
                                            var allServices = servicesJson.all;
                                            $scope.categories = allServices;
                                            // adding properties to service objs
                                            $scope.categories.forEach(function(category){
                                                category.list.forEach(function(service){
                                                    productObjects.setProductObject(service);
                                                    // if service is in cart update cart price
                                                    updateCartPrice(service);
                                                });
                                            });
                                            //window.console.log($scope.categories);
                                           
                                        }
                                    }

                                }
                            }
                        }

                    });
                } else {
                    $scope.packages = [];
                    $scope.services = [];
                    servicesPackagesCacheService.setCache().then(function(response){
                        var packagesJson = response['packages'];
                        if(packagesJson.hasOwnProperty("all")){
                            var allPackages = packagesJson.all;
                            $scope.packages = _sortAccordingtoPrice(allPackages);
                            // adding properties to package objs
                            $scope.packages.forEach(function(package){
                                productObjects.setProductObject(package);
                                // if package is in cart update cart price
                                updateCartPrice(package);
                            });

                        }

                        var servicesJson = response['services'];
                        if(servicesJson.hasOwnProperty("all")){
                            //categories ==== services provided by vyomo
                            var allServices = servicesJson.all;
                            $scope.categories = allServices;
                            // adding properties to service objs
                            $scope.categories.forEach(function(category){
                                category.list.forEach(function(service){
                                    productObjects.setProductObject(service);
                                    // if service is in cart update cart price
                                    updateCartPrice(service);
                                });
                            });
                            //window.console.log($scope.categories);
                           
                        }
                    });
                }
                
                $state.go('servicesPage.list');
            }
        }
    
    }])

    .controller( 'ServicePackageCtrl',['$scope', function ServiceController($scope) {
        window.console.log($scope);
    //     $scope.addOrRemovePackage = function(package){
    //         // add package to cart if it is not
    //         if(!package.isAddedToCart){
    //             package.addToCart();
    //         }
    //         else{
    //             package.removeFromCart();
    //         }
    //     };
    }])

    .controller( 'ServiceListCtrl',['$scope', function ServiceController($scope) {
        //For each service sub list of its types, collapsed flag

        $scope.isCollapsed = true;
        //Function Call Attach on change event of service list checkbox

    }]);