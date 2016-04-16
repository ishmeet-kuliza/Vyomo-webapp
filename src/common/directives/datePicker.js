
angular.module('Vyomo')
    .directive('vmDatetimePicker', function () {
        var format = 'MM/DD/YYYY HH:mm ';
        var today = new Date();
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, ctrl) {
                var inputElem = $(element[0]);

                inputElem.datetimepicker({
                    format: format,
                    sideBySide : true,
                    showClear : true,
                    minDate : today
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