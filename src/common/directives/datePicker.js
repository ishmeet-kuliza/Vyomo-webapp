
angular.module('Vyomo')
    .directive('vmDatetimePicker', function () {
        var format = 'MM/DD/YYYY HH:mm ';
        var today = new Date();
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, ctrl) {
                $(element[0]).datetimepicker({
                    format: format,
                    sideBySide : true,
                    showClear : true,
                    minDate : today
                });
                var picker = element.data("DateTimePicker");

                ctrl.$formatters.push(function (value) {
                    var date = moment(value);
                    if (date.isValid()) {
                        return date.format(format);
                    }
                    return '';
                });

                element.on('change', function () {
                    scope.$apply(function() {
                        var date = picker.getDate();
                        ctrl.$setViewValue(date.valueOf());
                    });
                });
            }
        };
    });