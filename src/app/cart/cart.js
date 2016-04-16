
angular.module('Vyomo')
    .controller( 'CartCtrl',['$scope', '$state','cartProduct','cart', 'productObjects', function CartController( $scope,$state, cartProduct,cart, productObjects) {
        $scope.isStep1Complete = "false";
        //Boolean used for hiding headers for packages  and service template used in view cart
        $scope.viewCart = true;
        $scope.packages = [];
        $scope.categories = [];
        $scope.step1Collapse = false;
        $scope.step2Collapse = false;

        $scope.paymentMode = true;
        $scope.dueDate = '';
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
        $scope.saveCart = function(){
            //Check if cart items>0
            if(cart.getCount() > 0 ){
                $scope.step2Collapse = false;
                $scope.step1Collapse = true;
                $state.go("checkoutCart.checkoutStep2");
            }
        };

        //Function to collapse steps
        $scope.collapsePanels = function(step){

            if(step === "step1") {
                $scope.step2Collapse = false;
                $scope.step1Collapse = true;
            }else{
                $scope.step2Collapse = true;
                $scope.step1Collapse = false;
            }
        };
        //Function to get previous addresses


    }])


    .controller( 'CartCheckoutCtrl',['$scope','globals', 'addressService', 'submitBookingService', function CartController($scope,globals,addressService,submitBookingService) {
        $scope.showAddressAddBox = false;
        //Date AND TIME STORe
        $scope.dateTime = new Date();
        $scope.dateOptions = '{format:"DD.MM.YYYY HH:mm"}';
        $scope.savedAddresses = [];
        $scope.dataCities = globals.getCities();
        $scope.selectedAddress = {
            'id':'0'
        };
       function getSavedAddress(){
            //API Call success method block
            addressService.getAllUserAddress().then(function(userAddresses){
                $scope.savedAddresses = userAddresses;
            },function(error){
                window.console.log(error);
            });

        }
        //Autocomplet address
        //in $scope.address --all the values being stored
        $scope.address = {
            city : '',
            address :'',
            landmark:'',
            latitude : '',
            longitude : ''
        };

        function addressAutocomplete(){
            var options = {
                componentRestrictions: {country: "in"}
            };

            var inputFrom = document.getElementById('locality');
            var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);
            google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
                var place = autocompleteFrom.getPlace();
                $scope.address.latitude = place.geometry.location.lat();
                $scope.address.longitude = place.geometry.location.lng();
                $scope.address.landmark = place.formatted_address;
                $scope.$apply();
            });
        }


        $scope.setDate = function(){
            window.console.log("htlto");

        };

        //Init functions
        addressAutocomplete();
        getSavedAddress();
        $scope.errorMsg = '';
        $scope.addAddress = function(){
            addressService.addUserAddress($scope.address).then(function(address_id){
                // shallow copy of object
                var address = Object.assign({}, $scope.address);
                address.address_id = address_id;
                $scope.savedAddresses.push(address);
                for(var key in $scope.address){
                    $scope.address[key] = '';
                }
                $scope.showAddressAddBox = false;
                $scope.errorMsg = '';
            },function(errorMsg){
                window.console.log(errorMsg);
                $scope.errorMsg = errorMsg;
            });
            
        };

        $scope.deleteAddress = function(address){
            // find index of adress to be deleted in list of user addresses
            var index = $scope.savedAddresses.indexOf(address);
            if(index > -1){
                // if found then call api and delete from list
                addressService.deleteUserAddress(address).then(function(){
                    $scope.savedAddresses.splice(index, 1);
                },function(error){
                    window.console.log(error);
                });
            }
        };

        $scope.confirmOrder = function(){
            var addressId = 1;
            submitBookingService.bookRequest(addressId).then(function(confirmMessage){
                window.console.log(confirmMessage);
            },function(error){
                window.console.log(error);
            });
        };

    }]);