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
	   		this.model.on('sync',this.render,this);
	   		this.model.fetch({
	   			data:{id:123},
                error:function(){
                    $.catchError();
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
			new Aside();//没有数据，仅展示；当然也可传输参数渲染；
			new Footer();//1.展示独立加载当前该数据模型，restful方式对Model（这里不涉及Collection）的get，put，destory
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