angular.module('Vyomo')

//Firefox doesn't emit the needed event when it autofills a form, so this lets that work.
//from http://victorblog.com/2014/01/12/fixing-autocomplete-autofill-on-angularjs-form-submit/

.directive('formAutoFillFix', function() {
  return {
    link: function(scope, elem, attrs) {
      // Fixes Chrome bug: https://groups.google.com/forum/#!topic/angular/6NlucSskQjY
      elem.prop('method', 'POST');

      // Fix autofill issues where Angular doesn't know about autofilled inputs
      if(attrs.ngSubmit) {
        window.setTimeout(function() {
          elem.unbind('submit').bind('submit', function(e) {
            e.preventDefault();
            elem.find('input').triggerHandler('change');
            scope.$apply(attrs.ngSubmit);
          });
        }, 0);
      }
    }
  };
});