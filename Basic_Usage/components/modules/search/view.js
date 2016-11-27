define([
	"doT", 
	"text!components/modules/search/tpl.html"
], function(doT, tpl) {
	return Backbone.View.extend({
		template: doT.template(tpl),
		events: {
			"click .js-keyword": "search",
			"keypress #search-keyword": "search"
		},
		initialize: function() {},
		render: function() {
			this.$el.html(this.template(this.model));
			return this;
		},
		search: function(event) {
			if (event.keyCode == 13 || $(event.currentTarget).hasClass('js-keyword')) { //回车键的键值是13
				var keyword = $("#search-keyword").val();
				if (keyword === "") {
					//layer.open({content:'请输入关键字',time:1.5});
					window.location.href = "#list";
					return !1;
				}
				window.location.href = "#list?&keyword=" + keyword;
			}

		}
	});
});