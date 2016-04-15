/**
 *  Directive for cart price
 *  author/ Ekluv-Dev
 */
angular.module('Vyomo')
    .directive('cartPrice', ['cart', function(cart){
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '<div>Directive--Price={{totalPrice}}<span>Count={{cartCount}}</span></div>',
        templateUrl: '/src/app/directiveViews/cart-price.html',
        replace: true,
        scope: {},
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope) {



        $scope.$watchCollection(function(){
            return cart.totalPrice;
        }, function(newPrice){
            $scope.totalPrice = newPrice;
        });

        $scope.$watchCollection(function(){
            return cart.getCount();
        }, function(newCount){
            $scope.cartCount = newCount;
        });

        }
    };
}]);