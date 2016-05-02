define(["apps/goods/views/main"], function (view1) {
    var urlApi ="data/home.php";
    return {
        main: function(id) {
            this.mainView = new view1(id,urlApi);
        }
    };
});