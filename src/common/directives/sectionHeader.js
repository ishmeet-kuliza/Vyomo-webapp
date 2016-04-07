
app.directive('sectionHeader',function(){
    return {
        restrict : 'E',
        scope:{
            title : '@',
            subtext : '@'
        },
        template : '<h2 class="text-center sectionHead pt-40"> <span>{{title}}</span></h2>'+
                    '<p class="row removeMargin text-center sectionSubhead"> {{subtext}}</p>'

    };
});