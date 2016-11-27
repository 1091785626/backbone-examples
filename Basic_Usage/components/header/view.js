define([
	'doT', 
	'text!components/header/tpl.html'
], function(doT, tpl) {
	return Backbone.View.extend({
		id: 'signTpl',
		template: doT.template(tpl),
		initialize: function() {},
		render: function(data) {
			this.$el.html(this.template(data));
			return this;
		}
	});
});