;(function($){
	$.setTitle = function(t) {
		var $body = $('body');
		document.title = t;
		// hack在微信等webview中无法修改document.title的情况
		if ($.device.weixin){
			var $iframe = $('<iframe src="/empty.html"></iframe>').on('load', function() {
			  setTimeout(function() {$iframe.off('load').remove();}, 0);
			}).appendTo($body);
    	} 
	};
})(jQuery);