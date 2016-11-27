define(["paginator"], function(e) {
	return Backbone.PageableCollection.extend({
		initialize: function(url, type, keyword) {
			this.urlApi = url;
			this.type = type;
			this.keyword = keyword;
		},
		url: function() {
			return this.urlApi
		},
		//mode: "server",
		state: {
			pagesInRange: 0,
			pageSize: 10,
		},
		queryParams: {
			totalRecords: null,
			currentPage: "page",
			totalPages: null,
			pageSize: "limit",
			type: function() {
				return (this.type != null ? this.type : null);
			},
			keyword: function() {
				return (this.keyword != null ? this.keyword : null);
			}
		},
		parseState: function(resp, queryParams, state, options) {
			return {
				totalRecords: resp._count //这个值为29  toalpages最多10,输出不是20
			};
		},
		parseRecords: function(resp, options) {
			return resp.data;
		}
	});
});