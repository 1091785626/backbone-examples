define(["doT",
	"text!apps/goods/templates/main.html",
	"apps/goods/models/goods"],function (doT,tpl,Model) {
   return Backbone.View.extend({
	    id: "view-goods",
	    template: doT.template(tpl),
	    events:{},
	    initialize: function (id,urlApi) {
	    	$.setTitle("商品详情");
	    	this.id=id;
	   		$("#views").append(this.$el);
	   		this.model = new Model(urlApi);
	   		this.model.on('sync',this.render,this);
	   		this.model.fetch({
                error:function(){
                    $.catchError();
                }
            });
	    },
	    render: function () {//这里请无视
	   		this.$el.html(this.template(this));
			$.loading("hide");
        }

	});
});