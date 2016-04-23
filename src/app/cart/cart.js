
angular.module('Vyomo')
    .controller( 'CartCtrl',['$scope', '$state','cartProduct','cart', 'productObjects', 'globals',function CartController( $scope,$state, cartProduct,cart, productObjects, globals) {
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
        // fn to remove package from cart and view
        $scope.removePackageFromCart = function(package){
            var index = $scope.packages.indexOf(package);
            if(index > -1){
                package.clearFromCart();
                $scope.packages.splice(index, 1);
            }
        };
        // fn to remove category from cart and view
        $scope.removeCategoryFromCart = function(category){
            var index = $scope.categories.indexOf(category);
            if(index > -1){
                $scope.categories.splice(index, 1);
                category.list.forEach(function(service) {
                    service.clearFromCart();
                });
            }
        };

        cart.init(cart.getCity());
        if(cart.getCount()){
            // to block ui untill response from server
            $.blockUI({message: globals.blockUIMsg});
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
                $.unblockUI();
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
        $scope.collapsePanels = function(){

                $scope.step1Collapse = !$scope.step1Collapse;

        };
        //Function to get previous addresses


    }])


    .controller( 'CartCheckoutCtrl',['$scope','globals', 'addressService', 'submitBookingService', '$state', 'cart',function CartController($scope, globals, addressService, submitBookingService, $state, cart) {
        $scope.showAddressAddBox = false;
        //Date AND TIME STORe
        $scope.dateTime = new Date();
        $scope.dateOptions = '{format:"DD.MM.YYYY HH:mm"}';
        $scope.savedAddresses = [];
        $scope.dataCities = globals.getCities();
        var blockUIMsg = globals.blockUIMsg;
        $scope.selectedAddress = {
            'id': ''
        };
       function getSavedAddress(){
            $.blockUI({message: globals.blockUIMsg});
            //API Call success method block
            addressService.getAllUserAddress().then(function(userAddresses){
                $.unblockUI();
                $scope.savedAddresses = userAddresses;
            },function(error){
                $.unblockUI();
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

        function getAbsPosition(el){
                var el2 = el;
                var curtop = 0;
                var curleft = 0;
                if (document.getElementById || document.all) {
                    do  {
                        curleft += el.offsetLeft-el.scrollLeft;
                        curtop += el.offsetTop-el.scrollTop;
                        el = el.offsetParent;
                        el2 = el2.parentNode;
                        while (el2 !== el) {
                            curleft -= el2.scrollLeft;
                            curtop -= el2.scrollTop;
                            el2 = el2.parentNode;
                        }
                    } while (el.offsetParent);

                } else if (document.layers) {
                    curtop += el.y;
                    curleft += el.x;
                }
                return [curtop, curleft];
        }


        $scope.adjustAutocompleteGooglePos = function(){

          var inputElemTop = document.getElementById("locality");
          var posInputElem = getAbsPosition(inputElemTop);
          var autoCompleteTop = posInputElem[0] + 50 + "px";
          document.querySelector('.pac-container').style.top = autoCompleteTop;
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

        //Init functions
        addressAutocomplete();
        getSavedAddress();
        $scope.errorMsg = '';
        $scope.addAddress = function(){
            $.blockUI({message: blockUIMsg});
            addressService.addUserAddress($scope.address).then(function(address_id){
                // shallow copy of object
                var address = Object.assign({}, $scope.address);
                address.address_id = address_id;
                $scope.savedAddresses.push(address);
                // select newly added address for delivery
                window.setTimeout(function(){
                    var dom = document.getElementById('roundedOne'+ address_id);
                    if(dom){
                        dom.checked = true;
                        $scope.selectedAddress.id = address_id;
                        }
                    }, 100);

                for(var key in $scope.address){
                    $scope.address[key] = '';
                }
                // done to hide address form
                $scope.showAddressAddBox = false;
                $scope.errorMsg = '';
                $.unblockUI();
            },function(errorMsg){
                $.unblockUI();
                window.console.log(errorMsg);
                $scope.errorMsg = errorMsg;
            });
            
        };

        $scope.deleteAddress = function(address){
            // find index of adress to be deleted in list of user addresses
            var index = $scope.savedAddresses.indexOf(address);
            if(index > -1){
                $.blockUI({message: blockUIMsg});
                // if found then call api and delete from list
                addressService.deleteUserAddress(address).then(function(){
                    $scope.savedAddresses.splice(index, 1);
                    $.unblockUI();
                },function(error){
                    window.console.log(error);
                });
            }
        };

        $scope.confirmOrder = function(){
            var addressId = $scope.selectedAddress.id;
            var when = document.getElementById('date-time').value;
            $.blockUI({message: blockUIMsg});
            submitBookingService.bookRequest(addressId, when).then(function(confirmBookingMsg){
                $.unblockUI();
                cart.clearCart();
                $state.get('appointments').confirmBookingMsg = confirmBookingMsg;
                $state.go('appointments');    
            },function(error){
                $.unblockUI();
                $scope.bookingError = '*' + error;
            });
        };

    }]);