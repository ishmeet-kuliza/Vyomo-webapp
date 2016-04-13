angular.module('Vyomo').directive('totalPriceHeader' , ['cart' , function(cart){
    return {
        restrict : 'AE',
        scope:{
            offerCode : '@',
            subTotal : '@',
            discount : '@'
        },
        template : '<div class="vm-cart-bill-row"><div class="vm-offer-code-box list-inline-elems">'+
                    '<input type="text" name="offerCode" value="{{offerCode}}" class="form-control" placeholder="Enter Offer Code"></div><div class="list-inline-elems pull-right totalField fields">'+
                    'Total Cost<span class="totalVal font-bold">&#8377 {{totalPrice}}</span></div>'+
                    '<div class="list-inline-elems pull-right disountField fields">Discount'+
                    '<span class="discountVal font-bold">&#8377 {{discount}}</span></div>'+
                    '<div class="list-inline-elems pull-right subTotalField fields">Sub Total'+
                    '<span class="subTotalVal font-bold">&#8377 {{subTotal}}</span></div></div>',

        replace : true,

        link: function($scope){
            $scope.$watchCollection(function(){
            return cart.totalPrice;
        }, 
        function(newPrice){
            $scope.totalPrice = newPrice;
        });
        }

};

}]);