define(function() {
    return Backbone.Model.extend({
    	initialize:function(url){this.urlApi=url;},
    	urlRoot:function(){return this.urlApi;}
    });
});