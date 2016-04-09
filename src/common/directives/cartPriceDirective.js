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
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        template: '<div>{{totalPrice}}</div>',
        // templateUrl: 'directiveViews/cart-price.html',
        replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope) {

         $scope.$watchCollection(function(){
             return cart.totalPrice;
         }, function(newPrice){
             $scope.totalPrice = newPrice;
         });
         window.console.log(cart);
        }
    };
}]);