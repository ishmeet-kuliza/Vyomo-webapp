/**
 *  Services/ Factory for cart
 */
angular.module('Vyomo')
	.factory('Cart', ['$cookies', function($cookies){
		var cart = {
			itemCookie: ''
		};
		cart.init = function (itemCookie) {
			this.itemCookie = itemCookie;

			if(!($cookies.get(this.itemCookie) instanceof Array )){
				$cookies.put(this.itemCookie, []);
			}
		};
		cart.addItem = function (item, quantity){
			if(quantity === undefined){
				quantity = 1;
			}
			var items = $cookies.get(this.itemCookie);
			var product = {
				id: item.id,
				quantity: quantity,
				price: item.price
			};
			items.push(product);
			$cookies.put(this.itemCookie, items);
		};

		cart.getItem = function(index){
			var items = $cookies.get(this.itemCookie);
			return items[index];
		};

		cart.updateQuantity = function(index, quantity){
			var items = $cookies.get(this.itemCookie);
			items[index].quantity = quantity;
			$cookies.put(this.itemCookie, items);
		};

		cart.removeItem = function(index){
			var items = $cookies.get(this.itemCookie);
			items.splice(index, 1);
			$cookies.put(this.itemCookie, items);
		};

		cart.getTotalItems = function(){
			var items = $cookies.get(this.itemCookie);
			var itemsCount = 0;
			items.forEach(function(item) {
				itemsCount += item.quantity;
			});
			return itemsCount;
		};

		cart.getProductPrice = function(index){
			var item = this.getItem(index);
			return item.price * item.quantity;
		};

		cart.getCartPrice = function(){
			var items = $cookies.get(this.itemCookie);
			var totalPrice = 0;
			items.forEach(function(item) {
				totalPrice += item.price * item.quantity;
			});
			return totalPrice;
		};
		return cart;
	}]);