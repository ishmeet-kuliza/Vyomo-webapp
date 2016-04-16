angular.module('Vyomo').directive('totalPriceHeader' , ['cart' ,'promoCodeService', function(cart, promoCodeService){
    return {
        restrict : 'AE',
        scope:{
            offerCode : '@',
            subTotal : '@',
            discount : '@',
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

            $scope.promoCode = '';
            $scope.discount = 0;
            $scope.errorMsg = '';
            $scope.verifyPromoCode = function(){
                if($scope.promoCode && $scope.promoCode.length){
                    promoCodeService.verifyCode($scope.promoCode).then(function(costAfterPromo){
                        $scope.discount = cart.totalPrice - costAfterPromo;
                        cart.totalPrice = costAfterPromo;
                    },function(error){
                        $scope.errorMsg = error;
                        window.console.log(error);
                    });
                }
            };
        }
    };

}]);