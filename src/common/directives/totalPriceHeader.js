angular.module('Vyomo').directive('totalPriceHeader' , ['cart' ,'promoCodeService', function(cart, promoCodeService){
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
                $scope.totalPrice = newPrice;
            });

            $scope.discount = 0;
            $scope.errorMsg = '';
            $scope.successMsg = '';
            $scope.verifyPromoCode = function(){
                var promocode = document.getElementById('promocode').value;
                var when = document.getElementById('date-time').value;
                if(promocode){
                    promoCodeService.verifyCode(promocode,when).then(function(costAfterPromo){
                        $scope.discount = cart.totalPrice - costAfterPromo;
                        cart.totalPrice = costAfterPromo;
                        $scope.errorMsg = '';
                        $scope.successMsg = 'Promo code applied successfully';
                    },function(error){
                        $scope.successMsg = '';
                        $scope.errorMsg = error;
                        window.console.log(error);
                    });
                }
            };
        }
    };

}]);