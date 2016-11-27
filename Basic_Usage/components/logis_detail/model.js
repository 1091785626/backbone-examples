define(function() {
	return Backbone.Model.extend({
		initialize: function(url) {
			this.urlApi = url;
		},
		url: function() {
			return this.urlApi;
		}
	});
});