define(["apps/user/modules/edit_addr/views/main"], function (view1) {
    var urlApi="data/useredit.php";
    return {
        main: function() {
            this.mainView =  new view1(urlApi); 
        }
    };
});