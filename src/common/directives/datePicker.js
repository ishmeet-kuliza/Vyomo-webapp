
angular.module('Vyomo')
    .directive('vmDatetimePicker',['cartProduct','cart', '$rootScope', 'globals', function(cartProduct, cart, $rootScope, globals) {
        var format = 'YYYY-MM-DD HH:mm';
        var today = new Date();
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, ctrl) {
                var inputElem = $(element[0]);
                inputElem.datetimepicker({
                    format: format,
                    stepping : 5,
                    showClear : true,
                    showClose : true,
                    minDate : today,
                    toolbarPlacement : 'top',
                    widgetPositioning : {
                        vertical : 'bottom'
                    }
                });

                function getCurrentFormatedDate(){
                    var date = new Date();
                    var month = date.getMonth()+1;
                    var day = date.getDate();
                    date.setHours(date.getHours()+1);
                    var hours = ("0" + (date.getHours())).slice(-2);
                    var minutes = ("0" + date.getMinutes()).slice(-2);

                    var formattedDate = date.getFullYear() + '-' +
                    (month<10 ? '0' : '') + month + '-' +
                    (day<10 ? '0' : '') + day + ' '+ hours + ':' + minutes;
                    return formattedDate;
                    }

                var picker = inputElem.data("DateTimePicker");
                window.console.log('pixker', picker);
                ctrl.$formatters.push(function (value) {
                    var date = moment(value);
                    if (date.isValid()) {
                        window.console.log(date.format(format));
                        return date.format(format);
                    }
                     return getCurrentFormatedDate();
                });

                var oldDate = null;
                function updateTaxes(firstTime){
                    var when = inputElem.val();
                    if(firstTime === true){
                        when = getCurrentFormatedDate();
                    }
                    if(!oldDate){
                        oldDate = when;
                    }
                    if(when.split(' ')[0] !== oldDate.split(' ')[0] || firstTime === true){
                        $.blockUI({message: globals.blockUIMsg});
                        cartProduct.getAppicableTaxes(when).then(function(taxes){
                            cart.taxArray = taxes;
                            $.unblockUI();
                            var totalTax = 0;
                            $rootScope.$emit('clearTax');
                            for(var i=0; i<taxes.length; i++){
                                totalTax += (taxes[i].amount/100) * cart.totalPrice;
                            }
                            totalTax = Math.floor(totalTax);
                            $rootScope.$emit('addTax', totalTax);
                            oldDate = when;
                   });
                }
            }
            updateTaxes(true);

            inputElem.on('dp.change', updateTaxes);  
            }
        };
    }]);