define(['backbone','fastclick','jquery','layer','self'], function (Backbone,Fastclick,$) {
    "use strict";
    Fastclick.attach(document.body);
    //下面定义一些方法；当然你也可以放入js/self 自定义的插件里，放在这里主要是方便修改
    $.pageInit = function() {
        //页面初始化相关操作
        $(window).unbind ('scroll');
        $('.scroll-fixed-btn').unbind('click');
        $(".indicator-overlay, .indicator-modal").remove();
        //清理单页面的方法
        $("#views,#popup").empty();

        /*清除缓存的临时数据 本项目需要用到*/
        if($.localStorage){
            sessionStorage.removeItem("selected");
            sessionStorage.removeItem("skudata");
        }
    };
    $.catchError = function(){
        layer.open({content:'数据异常',time:1.5});
        setTimeout(function(){Backbone.history.navigate('',{trigger:!0});},1500);
    };
    $.loadCss = function(url){
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    };
    $.getUrlParam = function(e) {
        var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
        hash=window.location.hash,
        url=hash.substring(hash.indexOf('?')+1),
        //url=window.location.search,//地址中没有#键使用
        n = decodeURI(url).substr(1).match(t);
        return n != null ? unescape(n[2]) : null;
    };
    $.localStorage = function() {//判断是否可以利用缓存
        try {
            localStorage.setItem("test", 1);
            return !0;
        } catch(error) {
            return !1;
        }
    };
    var Router = Backbone.Router.extend({ //定义路由
        routes: {
            '':'home',
            'user(/:action)':'user',
            'goods/:id':'goods',
            'list':'list',
            '*actions': 'defaultAction'
        },
        initialize: function () {
        //路由初始化可以做一些事//执行一次
            $(".loading-modal").remove();
            this.backUrl='';
            /*清除缓存的临时数据 本项目需要用到*/
            if($.localStorage){
                localStorage.removeItem("area");
                localStorage.removeItem("footer");
            }
        },
        home: function() {
            this.loading();
            require(['apps/home/app'], function (app) {
               app.main();
            });
        },
        user: function(action) {
            this.loading();
            require(['apps/user/app'], function (app) {
               app.main(action);
            });
        },
        goods: function(id) {
            this.loading();
            require(['apps/goods/app'], function (app) {
               app.main(id);
            });
        },
        list: function() {
            this.loading();
            require(['apps/list/app'], function (app) {
               app.main();
            });
        },
        loading:function(){
            $.loading();
            $.pageInit();
            this.backUrl=window.location.hash;
        },
        defaultAction: function () {
            var self =this;
            layer.open({content:'页面正在开发中',time:1.5});
            setTimeout(function(){
                Backbone.history.navigate(self.backUrl,{trigger:!0,replace:!0});
            },1500);
        }
    });
    return Router;
});