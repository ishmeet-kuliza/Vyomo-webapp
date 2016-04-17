
angular.module('Vyomo')
    .directive('vmDatetimePicker', function () {
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
                var picker = inputElem.data("DateTimePicker");
                window.console.log(picker);
                ctrl.$formatters.push(function (value) {
                    var date = moment(value);
                    if (date.isValid()) {
                        return date.format(format);
                    }
                    return '';
                });

                //inputElem.on('change', function () {
                //    window.console.log(inputElem.val());
                //    scope.$apply(function() {
                //        window.console.log("htlto");
                //        var date = picker.getDate();
                //        ctrl.$setViewValue(date.valueOf());
                //    });
                //});


                window.console.log(scope.dueDate);
            }
        };
    });