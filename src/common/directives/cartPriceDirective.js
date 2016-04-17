/**
 *  Directive for cart price
 *  author/ Ekluv-Dev
 */
angular.module('Vyomo')
    .directive('cartPrice', ['cart', '$state', function(cart, $state){
    // Runs during compile
    return {

        restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: '/src/app/directiveViews/cart-price.html',
        replace: true,
        scope: {},
        // transclude: true,
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

            $scope.goToCart = function(){
                if(cart.getCount()){
                    $state.go('checkoutCart');
                }
            };
        }
    };
}]);