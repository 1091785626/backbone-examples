;(function($){
	$.fn.loading = function(t) {
	   return t == "hide" ? $(this).find(".dropload-load").remove() : $(this).html('<div class="dropload-load"><span class="loading"></span>加载中</div>');
	};
	$.loading = function(t) {//jq扩展
	   return t == "hide" ? $(".loading-modal").remove() :$(".loading-modal")[0] || $("body").append('<div class="loading-modal"></div>');
	};
	$.indicator = function(t) {
	    t == "hide" ? $(".indicator-overlay, .indicator-modal").remove() :$(".indicator-overlay")[0] || $("body").append('<div class="indicator-overlay"></div><div class="indicator-modal"><div class="loading"></div></div>');
	};
})(jQuery);