angular.module('Vyomo').directive('totalPriceHeader' , ['cart' ,'promoCodeService', 'globals', '$rootScope', function(cart, promoCodeService, globals, $rootScope){
    return {
        restrict : 'AE',
        scope:{
            showOfferCode : '@'
        },

        templateUrl: '/src/app/directiveViews/priceHeader.html',

        replace : true,

        link: function($scope){
            $rootScope.$on('addTax', function(event, tax){
                $scope.totalPrice += tax;
            });

            $rootScope.$on('clearTax', function(){
                $scope.totalPrice = cart.totalPrice;
            });
            $scope.$watchCollection(function(){
                return cart.totalPrice;
            },
            function(newPrice){
                $scope.subTotal = newPrice;
                $scope.totalPrice = newPrice;
            });

            $scope.discount = 0;
            $scope.errorMsg = '';
            $scope.successMsg = '';

            function getTax(principle){
                var totalTax = 0;
                for(var i=0; i<cart.taxArray.length; i++){
                    totalTax += (cart.taxArray[i].amount/100) * principle;
                }
                totalTax = Math.floor(totalTax);
                return totalTax;
            }
            $scope.verifyPromoCode = function(){
                var promocode = document.getElementById('promocode').value;
                var when = document.getElementById('date-time').value;
                if(promocode){
                    $.blockUI({message: globals.blockUIMsg});
                    promoCodeService.verifyCode(promocode,when).then(function(costAfterPromo){
                        $.unblockUI();
                        $('#date-time').prop('disabled', true);
                        $('remove-promo-msg').text('Remove promo to select date');
                        $scope.discount = $scope.subTotal - costAfterPromo;
                        $scope.totalPrice = costAfterPromo;
                        $scope.errorMsg = '';
                        $scope.successMsg = 'Promo code applied successfully';
                        var totalTax = getTax(costAfterPromo);
                        $scope.totalPrice += totalTax;
                        getTax(costAfterPromo);
                    },function(error){
                        $.unblockUI();
                        $scope.successMsg = '';
                        $scope.errorMsg = error;
                    });
                }
            };

            $scope.removePromoCode = function(){
                promoCodeService.removePromoCode();
                $scope.successMsg = '';
                $scope.discount = 0;
                $scope.totalPrice = cart.totalPrice + getTax(cart.totalPrice);
                $('#date-time').prop('disabled', false);
                $('remove-promo-msg').text('');
                document.getElementById('promocode').value = '';
            };
        }
    };

}]);