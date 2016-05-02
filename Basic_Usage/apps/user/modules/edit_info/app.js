define(["apps/user/modules/edit_info/views/main"], function (view1) {
    var urlApi="data/userinfo.php";
    return {
        main: function() {
            this.mainView =  new view1(urlApi); 
        }
    };
});