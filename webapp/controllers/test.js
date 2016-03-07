define(['my', 'index'], function(my, index){
    var test = {
        init: function(){
            $('#data').html(_.template(my)({name: index}));
        }
    }
    return test;
});