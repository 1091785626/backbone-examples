define(['doT','text!apps/user/modules/edit_addr/templates/main.html','apps/user/modules/edit_addr/models/edit'],function (doT,tpl,Model){
	return Backbone.View.extend({
		id:'view-edit-addr',
		template:doT.template(tpl),
		initialize:function(urlApi){
			$.setTitle('三级路由');
			$('#views').append(this.$el);
			this.model = new Model(urlApi);
			this.model.on('sync',this.render,this);
			this.model.fetch({
				error:function(){
					$.catchError();
				}
			});
		},
		render:function(){
			this.$el.html(this.template(this.model.toJSON()));
			$.loading('hide');
		}
	});
});