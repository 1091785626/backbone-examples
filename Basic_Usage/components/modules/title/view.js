define(["doT","text!components/modules/title/tpl.html"],function (doT,tpl) {
   return Backbone.View.extend({
	    template: doT.template(tpl),
	    events:{},
	    initialize: function () {},
	    render: function () {
	   		this.$el.html(this.template(this.model));
			return this;
        }
	});
});