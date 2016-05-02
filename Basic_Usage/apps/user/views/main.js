define(["doT",
	"text!apps/user/templates/main.html",
	"apps/user/models/user",
	"components/footer/view"],function (doT,tpl,Model,footer) {
   var view= Backbone.View.extend({
	    id: "view-user",
	    template: doT.template(tpl),
	    initialize: function (urlApi) {
	    	$.setTitle("个人中心");
	   		$("#views").append(this.$el);
	   		this.model = new Model(urlApi);
            this.virtualModel =new Model(urlApi);
	   		this.model.on('sync',this.render,this);
	   		this.model.fetch({
                error:function(){
                    $.catchError();
                }
            });

	    },
	    render: function (e) {
	   		this.$el.html(this.template(this.model.toJSON()));
	   		new footer();
	   		$.loading("hide");
			$.setForward();
        },
	});
   return view;
});