angular.module('Vyomo').directive('totalPriceHeader',function(){
    return {
        restrict : 'E',
        scope:{
            offerCode : '@',
            subTotal : '@',
            discount : '@',
            total : '@'
        },
        template : '<div class="vm-cart-bill-row"><div class="vm-offer-code-box list-inline-elems">'+
                    '<input type="text" name="offerCode" value="{{offerCode}}" class="form-control" placeholder="Enter Offer Code"></div><div class="list-inline-elems pull-right totalField fields">'+
                    'Total Cost<span class="totalVal font-bold">&#8377 {{total}}</span></div>'+
                    '<div class="list-inline-elems pull-right disountField fields">Discount'+
                    '<span class="discountVal font-bold">&#8377 {{discount}}</span></div>'+
                    '<div class="list-inline-elems pull-right subTotalField fields">Sub Total'+
                    '<span class="subTotalVal font-bold">&#8377 {{subTotal}}</span></div></div>',

        replace : true

        //link: function($scope) {
        //
        //}

    };
});