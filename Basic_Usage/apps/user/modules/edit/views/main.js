define(['doT', 'text!apps/user/modules/edit/templates/main.html', 'apps/user/modules/edit/models/edit'], function(doT, tpl, Model) {
	return Backbone.View.extend({
		id: 'view-edit',
		template: doT.template(tpl),
		initialize: function(urlApi) {
			$.setTitle('资料编辑');
			$('#views').append(this.$el);
			this.model = new Model(urlApi);
			this.model.on('sync', this.render, this);
			this.model.fetch({
				error: function() {
					$.catchError();
				}
			});
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			$.loading('hide');
			$.setForward();
		}
	});
});