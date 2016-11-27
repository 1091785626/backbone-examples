define([
	"doT", 
	"text!apps/list/templates/item.html", 
	'components/logis_detail/view'
], function(doT, tpl, View) {
	var view = Backbone.View.extend({
		className: "col-6",
		template: doT.template(tpl),
		events: {
			'click .js-open': 'open',
			'click .js-put': 'put',
			'click .js-del': 'delete'
		},
		initialize: function() {
			this.listenTo(this.model, "sync", this.render);
			this.listenTo(this.model, 'destroy', this.remove); //用于删除视图
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		open: function(event) {
			var nextView = new View($(event.currentTarget).data('id'));
		},
		delete: function(event) {
			var id = $(event.currentTarget).data('id');
			this.model.destroy({
				success: function(model, response) { //保存成功执行
				},
				error: function(model, response, xhr) { //404//或者其他错误
					layer.open({
						content: response.status != 200 ? '异常错误' : response.responseText,
						time: 1.5
					});
				}
			});
		},
		put: function(event) {
			this.model.set({
				title: this.model.get('title') ? 0 : 1
			});
			this.model.save(null, {
				success: function(model, response) { //保存成功执行

				},
				error: function(model, response, xhr) { //404//或者其他错误
					layer.open({
						content: response.status != 200 ? '异常错误' : response.responseText,
						time: 1.5
					});
				}

			});
		}
	});
	return view;
});