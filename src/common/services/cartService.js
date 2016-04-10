/**
 *  Services/ Factory for cart
 *  author/ Ekluv-Dev
 */
angular.module('Vyomo')
	.factory('cart', ['$cookies', function($cookies){
		var cart = {
			itemCookie: '',
			totalPrice: 0
		};

		cart._updateCookie = function(key, value){
			// setting cookies with expiry date
			var expireDate = new Date();
			expireDate.setDate(expireDate.getDate() + 1);
			$cookies.putObject(key, value, {expires: expireDate});
		};

		cart.init = function(itemCookie) {
			// intialize cart with itemCookie as name
			this.itemCookie = itemCookie;
			// if cookie is empty or not array then set to array
			if(!Array.isArray($cookies.getObject(this.itemCookie))){
				this._updateCookie(this.itemCookie, []);
			}
		};

		cart.addItem = function(item){
			if(item.quantity === undefined){
				item.quantity = 1;
			}
			var items = $cookies.getObject(this.itemCookie);
			items.push(item.service_id);
			this.totalPrice += item.cost;
			window.console.log(items);
			window.console.log('total price', this.totalPrice);
			this._updateCookie(this.itemCookie, items);
		};

		cart.getItem = function(index){
			var items = $cookies.getObject(this.itemCookie);
			return items[index];
		};
		// removes item from cart
		cart.removeItem = function(item){
			var items = $cookies.getObject(this.itemCookie);
			var index = items.indexOf(item.service_id);
			// if product found in cart 
			if (index > -1) {
				items.splice(index, 1);
				this.totalPrice -= item.cost;
			}
			this._updateCookie(this.itemCookie, items);
		};

		// return total products in cart
		cart.getCount = function(){
			var items = $cookies.getObject(this.itemCookie);
			return items ? items.length: 0;
		};
		// check whether item is in cart
		cart.hasItem = function(item){
			var items = $cookies.getObject(this.itemCookie);
			var index = items.indexOf(item.service_id);
			if (index > -1){
				return true;
			}
			else {
				return false;
			}
		};
		// method to delete cart
		cart.destroyCart = function(){
			$cookies.remove(this.itemCookie);
		};

		return cart;
	}]);