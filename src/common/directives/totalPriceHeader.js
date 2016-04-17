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

            $scope.verifyPromoCode = function(){
                var promocode = document.getElementById('promocode').value;
                window.console.log(promocode);
                if(promocode){
                    promoCodeService.verifyCode(promocode).then(function(costAfterPromo){
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