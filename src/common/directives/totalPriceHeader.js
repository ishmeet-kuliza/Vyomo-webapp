angular.module('Vyomo').directive('totalPriceHeader' , ['cart' ,'promoCodeService', function(cart, promoCodeService){
    return {
        restrict : 'AE',
        scope:{
            offerCode : '@',
            subTotal : '@',
            discount : '@',
            showOfferCode : '@'
        },
        template : '<div class="vm-cart-bill-row"><div class="vm-offer-code-box list-inline-elems" ng-if="showOfferCode">'+
                    '<input type="text" name="offerCode" ng-model="promoCode" class="form-control" placeholder="Enter Offer Code">' +
                    '<span class="success-control-label"></span><span class="control-label"></span></div>' +
                    '<span class="vm-link ml-10 mt-10" id="vm-applyCoupon" ng-if="showOfferCode">Apply</span>' +
                    '<div class="list-inline-elems pull-right totalField fields mt-10">'+
                    'Total Cost<span class="totalVal font-bold">&#8377 {{totalPrice}}</span></div>'+
                    '<div class="list-inline-elems pull-right disountField fields mt-10">Discount'+
                    '<span class="discountVal font-bold">&#8377 {{discount}}</span></div>'+
                    '<div class="list-inline-elems pull-right subTotalField fields mt-10">Sub Total'+
                    '<span class="subTotalVal font-bold">&#8377 {{subTotal}}</span></div>',

        // templateUrl: '/directives/templates/total-price-header.html',

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