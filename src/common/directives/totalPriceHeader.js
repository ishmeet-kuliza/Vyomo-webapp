angular.module('Vyomo').directive('totalPriceHeader' , ['cart' ,'promoCodeService', 'globals', function(cart, promoCodeService, globals){
    return {
        restrict : 'AE',
        scope:{
            showOfferCode : '@'
        },

        templateUrl: '/src/app/directiveViews/priceHeader.html',

        replace : true,

        link: function($scope){

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
            $scope.verifyPromoCode = function(){
                var promocode = document.getElementById('promocode').value;
                var when = document.getElementById('date-time').value;
                if(promocode){
                    $.blockUI({message: globals.blockUIMsg});
                    promoCodeService.verifyCode(promocode,when).then(function(costAfterPromo){
                        $.unblockUI();
                        $scope.discount = $scope.subTotal - costAfterPromo;
                        $scope.totalPrice = costAfterPromo;
                        $scope.errorMsg = '';
                        $scope.successMsg = 'Promo code applied successfully';
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
                $scope.totalPrice = cart.totalPrice;
                document.getElementById('promocode').value = '';
            };
        }
    };

}]);