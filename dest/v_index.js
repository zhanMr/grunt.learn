/*!20+0800n 20ar 07 2016 10:20:33 G20A+0800 (中国标准时间) */
define(function(){
    return 'hello grunt'
});define(['my', 'index'], function(my, index){
    var test = {
        init: function(){
            $('#data').html(_.template(my)({name: index}));
        }
    }
    return test;
});define(function(){
    return '<%=name%>'
});