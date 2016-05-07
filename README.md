#Backbone+RequireJS
###选择的原因：
入门简单，可依赖jQuery，MVC模式，最主要的原因在于公司移动端项目没人负责，扛起大旗研究了一番，一路磕磕碰碰，完成底层搭建和后期工作完成整个项目。给我带来最大的帮助模块化和组件化，以及工具等相关自定义和插件的运用。这里主要介绍项目的搭建和一些注意用法，可以下载后用wampserver直接运行测试数据
###感谢促使我一路成长各大社区论坛，好心人。
感谢以下的博客

* [Backbone API中文文档](http://www.css88.com/doc/backbone/)
* [Backbone 使用总结，内存泄漏等](https://segmentfault.com/a/1190000000589218) 
* [Backbone 的技巧和模式](http://blog.jobbole.com/46420/)
* [我的启蒙老师：工程化，模块化，组件化](https://github.com/fouber/blog/issues/10)

###项目其他依赖，UI及其他方法自己定义，毕竟Backbone只提供了MVC框架
 
* doT.js------------------------------模版渲染引擎 替代原有的
* layer.mobile.js------------------弹出层 顺便将其UI自定义；
* backbone.paginator.js-------用于项目的集合分页，取代原Backbone集合功能
* fastclick.js
* swiper.js
* .....

##如果你对构建没有兴趣的话就直接看第三部分


###一、项目的目录及其功能，方便管理
<pre>
Backbone      
├─apps                     可以理解为pages，页面路由，控制组件排列
│  │
│  ├─list                  定义路由为#list
│  │  ├─collections        数据集合
│  │  ├─templates          模版文件
│  │  ├─views              视图与控制
│  │  └─app.js             路由入口文件，配置参数urlapi和其他
│  │ 
│  └─user                  定义路由为#user
│      ├─models            数据模型    
│      ├─templates    
│      ├─views 
│      ├─modules           用于二级路由，三级路由
│      │  ├─edit           定义二级路由#user/edit
│      │  ├─edit_addr      定义三级路由#user/edit_addr
│      │  ├─edit_info      ....
│      │  └─modules.js     二、三级路由的配置
│      └─app.js 
│   ......          
├─components               组件UI
│  │              
│  ├─header                顶部
│  │   ├─tpl.html          模版
│  │   └─view.js           视图与控制
│  ├─footer                ....
│  └─modules               自定义模块渲染
│  .......          
├─css                      样式地址；
├─data                     前端配合后台模拟的数据，下面会介绍一种静态的restful模拟，可以直接用
├─js                       
│  ├─lib                   项目依赖（合并形成一个文件）
│  ├─plugin                额外用的插件，为了压缩合并独立
│  └─self                  定义一些方法，比如验证正则等；如果是小量的，可以直接在router.js定义
│                   
└─index.html               项目的单页面入口，可以在这里定义全局的变量；
</pre>

###二、项目构建
####1.首页是index.html;
```javascript
  var _global= {
        user    : "Deot",
        id      : 123,
        mobile  :123
  };//全局变量 _global.mobile可以变成一个经常复用的参数等.....
```
```html
<div id="views"></div>              <!--所有页面渲染时插入到这里；-->
<div class="loading-modal"></div>   <!--加载动画；-->
<div id="popup"></div>              <!--弹出层时渲染到这里；-->
```
接下来就是require->main.js
####2.路由部分：route.js
```javascript
//在这里，我们可以定义简单的插件，同样会暴露到全局；复用很方便，所以在这里可以自定义方法；
$.loading = function(){/*相关loading代码*/};
//比如加载动画
$.pageInit = function(){/*页面初始化代码*/};
//简单粗暴的empty,清空dom，然后进入一下个路由页面，页面生命周期，你也可以使用其他方式；必然过场动画；
$.catchError = function(){/*数据异常时执行*/};
//数据异常
$.getUrlParam = function(){/*路由地址?id=123&user=Deot*/};
//读取URL地址所带信息
/*
．．．．
．．．．
方法还有很多，这里相对于jQuery简单扩展，如果需要比较大的，请放入utils中；
 */

```

```javascript
routes: {
    '':'home',                  主页面
    'user(/:action)':'user',    一二三及页面，用于判断页面二三级路由
    'goods/:id':'goods',        带参数
    'list':'list',              单一页面
    '*actions': 'defaultAction' 404页面
}
```

```javascript
initialize: function () {//执行一次
    $(".loading-modal").remove();//路由初始化可以做一些事
    this.backUrl='';
    if($.localStorage){/*清除缓存的临时数据 本项目需要用到*/
        localStorage.removeItem("area");
        localStorage.removeItem("footer");
    }
}
user: function(action) {
    this.loading();
    require(['apps/user/app'], function (app) {
       app.main(action);            //传入的参数
    });
},
loading:function(){
    $.loading();                    //动画
    $.pageInit();                   //页面初始化配置
    this.backUrl=window.location.hash;//记录当前路由
},
defaultAction: function () {
    var self =this;
    layer.open({content:'页面正在开发中',time:1.5});
    setTimeout(function(){
        Backbone.history.navigate(self.backUrl,{trigger:!0,replace:!0});//返回上一级
    },1500);
}
```

####3.启动页面app.js
```javascript
define(["apps/home/views/main"], function (view) {
    var urlApi ="data/home.php";//表示数据的url
    return {
        main: function() {
            this.mainView = new view(urlApi);//创建视图
        }
    };
});
```

####4.数据模型models/model.js
```javascript
define(function() {
    return Backbone.Model.extend({
        initialize:function(url){
            this.urlApi=url;//初始化的地址
        },
        urlRoot:function(){//这里有url和urlRoot，存在一定区别；第三部分会讲解
            return this.urlApi;
        }
    });
});
```

####5.数据集合collections/collections.js；这推荐使用集合分页插件；我在文件中#list中使用过
```javascript
define(["paginator"],function(e) {
    return Backbone.PageableCollection.extend({
        initialize:function(url,type,keyword){//传递请求时所带参数如?type=1&keyword=123
        	this.urlApi=url;
    		this.type=type;
    		this.keyword=keyword;
    	},
    	url:function(){return this.urlApi},
    	state: {//从0页开始，每页10个
			pagesInRange: 0,
			pageSize: 10,
		},
		queryParams: {//所带参数如?page=1&limit=10&type=1&keyword=123
			totalRecords: null,
			currentPage: "page",
			totalPages: null,
			pageSize: "limit",
			type:function(){
				return (this.type!==null?this.type:null);
			},
			keyword:function(){
				return (this.keyword!==null?this.keyword:null);
			}
		},
		parseState: function(resp, queryParams, state,options) {
			return {
				totalRecords: resp._count//集合的总数，进行分页
			};
		},
		parseRecords: function(resp,options) {//当前页集合的数据
			return resp.data;
		}
        //更多内容参考请搜索插件
    });
});
```

####6.视图views/main.js；如果组件不复用，可以选择放在这里，灵活使用trigger的方式，将其他组件触发绑定到main.js事件中；
```javascript
define(["doT",
    "text!apps/home/templates/main.html",
	"apps/home/models/home",
	"components/modules/modules",
	"components/header/view",
	"components/footer/view",
	"components/aside/view"],function (doT,tpl,Model,modules,Header,Footer,Aside) {
   return Backbone.View.extend({
	    id: "view-home",
	    template: doT.template(tpl),
	    events:{},
	    initialize: function (urlApi) {
	    	$.setTitle("店铺首页");
	   		$("#views").append(this.$el);
	   		this.model = new Model(urlApi);
	   		this.model.on('sync',this.render,this);//同步渲染
	   		this.model.fetch({
                data:{id:123},//请求的地址?id=123
                /*如果有规范要这么传/123，可以this.model.set({id:123});
                model.js使用this.get('id')或this.id获取参数*/
                error:function(){
                    $.catchError();//处理异常
                }
            });
	    },
	    render: function () {
	    	//先渲染布局
	   		this.$el.html(this.template());

	   		//将组件插入到页面布局中；一、二依托于布局中，三可独立
	   		var _this=this;
               
	   		//组件渲染方式一：1.插入到正常文档流；2.展示由该页面数据模型传入到组件
	   		$('.view-header').append((new Header()).render().$el)
               
			//组件渲染方式二：自定义模块
	   		$.each(this.model.get("data"),function(index,data) {
				_this.renderModule(data.type, data.content);
			});
            
			//组件渲染方式三：脱离正常文档流（fixed）
			var asideView = new Aside();
            //没有数据，仅展示；当然也可传输参数渲染；
			var footerView = new Footer();
            /*1.展示独立加载当前该数据模型，
            restful方式对Model（这里不涉及Collection）的get，put，destory*/
            
            //同样你可以使用footer中的时间回调，比如里面使用this.trigger('test',params)
            footerView.on('test',function(params){})
            
			$.loading("hide");
        },
        renderModule: function(type, model) {//通过厉遍形式渲染页面;
			var Module = require("components/modules/" + type + "/view");
			var moduleName = $('<div class=modules-' + type + '></div>');
			$(".view-container", this.$el).append(moduleName);
        	var moduleView = new Module({model: model});
			moduleName.html(moduleView.$el);
			moduleView.render();
        }
	});
});
```

* 对项目的开发规范要有所约束，减少每个人风格不同，这里只给出了一些简单的渲染；
* 实践是很重要的，我也是一路磕磕碰碰，页面很多不同逻辑操作需要自己去探索更加有意义


###三、核心部分数据模型增删改查，渲染页面，其他问题


###四、个人未来学习方向
* gulp、webpack等运用
* React Native 用js搭建的原生应用，提升自己的javascript；
* AngularJS 用此搭建后台管理系统；
* Node.js 学会搭建服务器； 
* 加油、加油、一个坚持梦想的男人！

####错误之处请指正，谢谢！问题意见联系 zrd0921@qq.com
