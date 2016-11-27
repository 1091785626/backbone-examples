define([
	"doT",
	"text!components/aside/tpl.html"
], function(doT, tpl) {
	var urlApi = "data/aside.php";
	return Backbone.View.extend({
		className: 'view-aside',
		template: doT.template(tpl),
		events: {
			"click .js-go-top": "goTop"
		},
		initialize: function() {
			this.render();
		},
		render: function(data, resp) {
			$('#views').append(this.$el.html(this.template()));
			this.hideTop();
		},
		hideTop: function() {
			$(window).on("scroll", function(e) {
				var t = $(window).scrollTop();
				t > 10 ? $(".js-go-top", this.$el).show() : $(".js-go-top", this.$el).hide();
			});
		},
		goTop: function(event) {
			$(document).scrollTop(0);
		}
	});
});