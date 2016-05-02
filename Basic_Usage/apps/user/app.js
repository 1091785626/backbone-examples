define(["apps/user/views/main","apps/user/modules/modules"], function (view1,modules) {
    var urlApi="data/user.php";
    return {
        main: function(action) {
            this.mainView = modules[action] != undefined ? modules[action].main() : new view1(urlApi); 
            // 如果有模块加载模块，否则加载一级路由
        }
    };
});