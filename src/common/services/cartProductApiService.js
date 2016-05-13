/**
 *  Services/ Factory for fetching cart products from api
 *  author/ Ekluv-Dev
 */
angular.module('Vyomo')
    .factory('cartProduct', ['cart', '$http', 'env', '$q','$rootScope', 'globals', function(cart, $http, env, $q, $rootScope, globals){
        var cartProduct = {tax: ''};
        var BASE_URL  = env.BASE_URL;

        cartProduct.getCartProducts = function(){
            var items = cart.getAllItems().toString();
            var postData = {city: cart.getCity(),
                what: 2,
                service_ids: items
            };
            return $http({
                method: 'POST',
                data: postData,
                url: BASE_URL + '/get_all_services'
            });

        };

        cartProduct.getAppicableTaxes = function(when){
            var postData ={
                when: when,
                city: cart.getCity()
            };
            var url = BASE_URL + '/get_applicable_taxes';
            var deferred = $q.defer();
            $http.post(url, postData).then(function(response){
                if(response && response.data && response.data.status_code === 200){
                    deferred.resolve(response.data.message);
                }
                else{
                    deferred.reject(response.data.error_message);
                }
            },function(error){
                deferred.reject(error);
            });
            return deferred.promise;
        };

        cartProduct.getCurrentFormatedDate = function(){
            var date = new Date();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var hours = ("0" + date.getHours() + 1).slice(-2);
            var minutes = ("0" + date.getMinutes()).slice(-2);

            var formattedDate = date.getFullYear() + '-' +
            (month<10 ? '0' : '') + month + '-' +
            (day<10 ? '0' : '') + day + ' '+ hours + ':' + minutes;
            return formattedDate;
            };

        cartProduct.updateTaxes = function(firstTime, when, onDateChange){
            // var when = inputElem.val();
            var self = this;
            if(self.tax && !onDateChange){
                $rootScope.$emit('addTax', self.tax);
            }
            if(firstTime === true){
                when = self.getCurrentFormatedDate();
            }
            if(!self.oldDate){
                self.oldDate = when;
            }
            if(when.split(' ')[0] !== self.oldDate.split(' ')[0] || firstTime === true){
                $.blockUI({message: globals.blockUIMsg});
                cartProduct.getAppicableTaxes(when).then(function(taxes){
                var totalTax = 0;
                $rootScope.$emit('clearTax');
                for(var i=0; i<taxes.length; i++){
                    totalTax += (taxes[i].amount/100) * cart.totalPrice;
                }
                totalTax = Math.floor(totalTax);
                $rootScope.$emit('addTax', totalTax);
                self.tax = totalTax;
                self.oldDate = when;
                $.unblockUI();
           });
        }
    };
    return cartProduct;
    }]);