
angular.module('Vyomo').directive('formGroup',function(){
    return {
        restrict : 'AE',
        scope : {
            label : '@',
            name : '@',
            placeholder :'@',
            id:'@',
            class:'@'
        },

        template : '<div class="form-group">'
    };
});
