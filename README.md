#Backbone+RequireJS
###选择的原因：
入门简单，可依赖jQuery，MVC模式，最主要的原因在于公司移动端项目没人负责，扛起大旗研究了一番，一路磕磕碰碰，完成底层搭建和后期工作完成整个项目。给我带来最大的帮助模块化和组件化，以及工具等相关自定义和插件的运用。这里主要介绍项目的搭建和一些注意用法，可以下载后用wampserver直接运行测试数据
###感谢促使我一路成长各大社区论坛，好心人。
感谢以下的博客

* [Backbone API中文文档](http://www.css88.com/doc/backbone/)
* [Backbone 使用总结，内存泄漏等](https://segmentfault.com/a/1190000000589218) 
* [Backbone 的技巧和模式](http://blog.jobbole.com/46420/)
* [前端之路：工程化，模块化，组件化](https://github.com/fouber/blog/issues/10)

###项目其他依赖，UI及其他方法自己定义，毕竟Backbone只提供了MVC框架
 
* doT.js------------------------------模版渲染引擎 替代原有的
* layer.mobile.js-------------------弹出层 顺便将其UI自定义；
* backbone.paginator.js---------用于项目的集合分页，取代原Backbone集合功能
* fastclick.js
* swiper.js
* .....

##如果你对构建没有兴趣的话就直接看第三，四部分


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
            
			//组件渲染方式三：脱离正常文档流（fixed）；建议少用
			var asideView = new Aside();
            //没有数据，仅展示；当然也可传输参数渲染；
			var footerView = new Footer();
            /*1.展示独立加载当前该数据模型，
            restful方式对Model（这里不涉及Collection）的get，put，destory*/
            
            //同样你可以使用footer中的时间回调，比如里面使用this.trigger('test',params)
            footerView.on('test',function(params){})
            
			$.loading("hide");
            //对于main.js的回调你可以这么使用
            Backbone.View.prototype.on('test-main',function(){
                console.log(123)
            })
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


###三、核心部分数据模型增删改查，和用户挂钩，能保证数据交互是学习的首要



[restful_api](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

可以通过简单的php模拟restful的请求；

```php
<?php
if($_SERVER['REQUEST_METHOD']=="DELETE"){
    echo '{"status": 1}';
}else if($_SERVER['REQUEST_METHOD']=="PUT"){
    echo '{"status": 1}';
}else if($_SERVER['REQUEST_METHOD']=="POST"){
   echo '{"status": 1}'; 
}else if($_SERVER['REQUEST_METHOD']=="GET"){
    echo '{"status": 1}';
}?>
```

数据的请求形式

* GET（SELECT）：从服务器取出资源（一项或多项）。
* POST（CREATE）：在服务器新建一个资源。
* PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
* PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
* DELETE（DELETE）：从服务器删除资源。

假如你获取的数据是这样的
```json
{
   "id":123,
   "style":1
}
```
比如url = /home 

* get------ /home
* put------ /home/123
* post----- /home
* delete----/home/123

####1.比较规范的restful方式
使用模型方式urlRoot会判断当前id，在footer组件中可查看相关例子，模拟三种状态
```javascript
var model =Backbone.Model.extend({
    urlRoot:function(){
        return '/home'
    }
})
```
```javascript
//还有就是需要重载url方法
var model =Backbone.Model.extend({
    url:function(){
        return '/home'+this.id?'/'+this.id:''
    }
})
```
如果你想用集合，在#list可查看相关例子，模拟四种状态
```javascript
var collection = Backbone.Collection.extend({
    url:'/home'
})
//在view.js中这样调用
//put方式请求如下
var model = this.collection.get('123');
model.set('style':0);
model.save(null,{
    success:function(model,response){},//保存成功执行
    error:function(model,response,xhr) {}//404//或者其他错误
});
```
数据返回形式

* GET /collection：返回资源对象的列表（数组）
* GET /collection/resource：返回单个资源对象
* POST /collection：返回新生成的资源对象
* PUT /collection/resource：返回完整的资源对象
* PATCH /collection/resource：返回完整的资源对象
* DELETE /collection/resource：返回一个空文档

####2.由于一些前期的误区，没有按照正确的restful走，我的项目（移动端商城系统）用了ajax方式请求(例子中不会用到，这里只是本人进入的误区)

* 对于此方法灵活运用也是一种好的方案，不受那么多局限
* 除了项目集合分页用到集合collection以外，其他均是模型model组成
* 一个页面一个model用于加载全部数据进行渲染
* 由于渲染的时候的时候可以通过dom实现双向绑定（绑定键值，比如data-id='123'）；
* 完全可以通过绑定好的键值的方式，请求数据后操作响应的dom；

model.js
```javascript
define(function() {
    return Backbone.Model.extend({
        initialize:function(url,type){
            //还可以传入其他参数比如这个type，如果view使用set，可以用get获取值
            this.urlApi = url;
            this.type = type;
        },
        url:function(){
            return this.urlApi+'?type'+this.type;
        }
    });
});
```
view.js
```javascript
define(["doT","text!apps/home/templates/main.html","apps/home/models/home"],function (doT,tpl,Model) {
   return Backbone.View.extend({
        id: "view-home",
	    template: doT.template(tpl),
	    events:{
	    	'click #get':'get',
	    	'click #put':'put',
	    	'click #post':'post',
	    	'click #delete':'delete'
	    },
	    initialize: function (urlApi) {
	    	$.setTitle("店铺首页");
	   		$("#views").append(this.$el);
	   		this.model = new Model(urlApi);
	   		this.model.on('sync',this.render,this);
	   		this.model.fetch({//这里一get的显示来渲染
	   			data:{id:123},
                error:function(){//用于其他put，post，delete的方式；
                    $.catchError();
                }
            });
            this.virtualModel = new Model(urlApi);//用于其他put，post，delete的方式；
	    },
	    render: function () {//渲染页面
	   		this.$el.html(this.template(this.model.toJSON()));
        },
        get:function(event){
        	this.model.fetch();//get方式，可带参数
        },
        put:function(event){//put方式，可带参数
        	var $this = $(event.currentTarget);
        	var id = $this.data('id');//获取绑定的键值
        	this.virtualModel.clear();
        	this.virtualModel.set({
        		id:id,//必须有一个id，不然将变为post求情
        		action:'changeNum',//通常带一个action让后台知道此时的put是操作什么
        		num:123
        	});
        	this.virtualModel.save(null,{
        		success:function(model,resp){
        			if(resp.status){//根据后台的值判断执行内容，true，flase
        				//做相应dom操作
        			}else{

        			}
        		}
        	});
         },
         post:function(event){//post方式，可带参数
        	var $this = $(event.currentTarget);
        	this.virtualModel.clear();
        	this.virtualModel.set({//不能带id，通常约定提交数据
        		num:123,
        		pay:99,
        		aid:11
        	});
        	this.virtualModel.save(null,{
        		success:function(model,resp){
        			if(resp.status){//根据后台的值判断执行内容，true，flase
        				//做相应dom操作
        			}else{

        			}
        		}
        	});
         },
         delete:function(event){
         	var $this = $(event.currentTarget);
        	var id = $this.data('id');//获取绑定的键值
        	$.ajax({
        		/*由于不是用集合创建的，在页面中列表是用模型创建，
        		只能用ajax的方法，以上put，post，也可以用ajax，
        		但是get可以用自带的方式，比较方便，可以使用fetch方式实现刷新页面，基本不闪白
        		*/
                dataType:'json',
                url: self.urlApi,
                type: "DELETE",
                data: {id:id}
            }).done(function (resp) {}).fail(function (resp) {});
        }
	});
});
```
* 数据交互上是最让人头疼的，现在也算是get一些门路，没有涉及数据交互的网上案例感觉上用处帮助都不是很大； 
* 总结：以上方法都可以使用ajax，至于post，put用自带的话，有些功能还可以用到，比如验证；也算是完成项目，最重要的还是学到模块化，组件化，复用的功能绝对不允许复制（写方法或共同引入）。


###四、渲染页面等其他问题
###1.渲染dom和事件相关
```javascript
this.$el.html(this.template(data));
//只是创建了一个节点，你需要插入在dom中，需要使用append
```
```javascript
var view = new Item({model:model})
$('#views').append(view.render(type).$el)
/*
这样前提是使用链式调用(redner中需要return this)，
不然需要写成view.$el;view.render(type)；
有时候你在Item中用这样一个操作 $('img.lazy').lazyload();//无法使用
建议你用this.$('img.lazy').lazyload();
主要原因在于渲染的节点未在dom中，它已经执行了，你需要绑定在$el中，理解执行顺序也很重要
*/
```
* 平时开发的时候也要主要代码的执行顺序，这个很重要，不然有时都找不到根源

####2.内存泄漏，以及undelegateEvents()和delegateEvents()

一定要注意你的el的用法；有时候为了防止冲突，需要解除绑定。
主要原因是同一个类绑定的事件，之前的视图没有销毁，导致事件连续触发，
通常出现于一个页面中弹出层中，重复实列化导致(这也是内存泄漏的原因)；所以你需要对相应的视图做解绑事件绑定，
更绝的你可以在某个事件之后销毁视图Backbone.View.prototype.remove.call(this);

内存泄漏：当每个页面有复用这个组件，页面切换时造成重复实列化了，之前的事件还存在内存中，你一个事件就有可能触发多次，这个时候就要在dom移除时接触绑定，还有就是你可以单独维护一个视图list；
还有个办法就是在View初始化的时候,这个比较麻烦，但还算实用；

```javascript
    this.trigger('remove-compnents-cart');
    var _this = this;
    Backbone.View.prototype.on('remove-compnents-cart',function(){
        //Backbone.View.prototype.remove;
        Backbone.View.prototype.off();
        _this.undelegateEvents();
    })
```

[视图销毁](http://stackoverflow.com/questions/6569704/destroy-or-remove-a-view-in-backbone-js)

####3.在组件化中灵活运用trigger（不过也要注意页面切换时事件没有被销毁的情况）；

这个可以跨视图绑定触发相关实践，因为一个页面是由多个组件组成，可以将一些触发带参数传入main.js执行一些操作

####4.项目打包
模块化，组件化后文件数量比较多，这个时候就需要打包技术了，gulp、grunt是不错的选择；这样文件打包后css只有一个文件（为了首屏加载，你可以额外划分，我的项目通过gzip后只有30kb，所以就不进行划分了，字库是采用iconfont链接引入），一个main.js包括整个的依赖库和常用的方法（不包括第三方定义的插件，如图表，gzip后75kb）；然后就是apps/中每个目录下只留下一个app.js（10-50kb不等），包括整个路由下的页面操作和模版；基本保证首次打开页面在总大小150kb左右；后续页面也只有10-50kb（css、main不再加载），图片等资源额外加载！

* 还有写技巧基本都注释在本文的代码里了，还有些操作可以通过案列熟悉下，最主要的开发还是在于自己的理解。学习是痛苦的，是因为不会，一定要在未知的领域探索，我们拒绝机械劳动！


###五、个人未来学习方向
* gulp、webpack等运用
* React Native 用js搭建的原生应用，提升自己的javascript；
* AngularJS 用此搭建后台管理系统；
* Node.js 学会搭建服务器； 
* 加油、加油、一个坚持梦想的男人！

####错误之处请指正，谢谢！问题意见联系 zrd0921@qq.com
