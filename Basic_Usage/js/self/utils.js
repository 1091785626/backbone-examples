;(function($) {
	$.fn.loading = function(t) {
		return t == "hide" ? $(this).find(".dropload-load").remove() : $(this).html('<div class="dropload-load"><span class="loading"></span>加载中</div>');
	};
	$.loading = function(t) { //jq扩展
		return t == "hide" ? $(".loading-modal").remove() : $(".loading-modal")[0] || $("body").append('<div class="loading-modal"></div>');
	};
	$.indicator = function(t) {
		t == "hide" ? $(".indicator-overlay, .indicator-modal").remove() : $(".indicator-overlay")[0] || $("body").append('<div class="indicator-overlay"></div><div class="indicator-modal"><div class="loading"></div></div>');
	};
	$.setTitle = function(t) {
		var $body = $('body');
		document.title = t;
		// hack在微信等webview中无法修改document.title的情况
		if ($.device.weixin) {
			var $iframe = $('<iframe src="/empty.html"></iframe>').on('load', function() {
				setTimeout(function() {
					$iframe.off('load').remove();
				}, 0);
			}).appendTo($body);
		}
	};
	$.catchError = function() {
		layer.open({
			content: '数据异常',
			time: 1.5,
			end: function() {
				Backbone.history.navigate('', {
					trigger: !0
				});
			}
		});
	};
	$.loadCss = function(url) {
		var link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = url;
		document.getElementsByTagName("head")[0].appendChild(link);
	};
	$.getUrlParam = function(value) {
		var t = new RegExp("(^|&)" + value + "=([^&]*)(&|$)"),
			hash = window.location.hash,
			url = hash.substring(hash.indexOf('?') + 1),
			//url=window.location.search,//地址中没有#键使用
			n = decodeURI(url).substr(1).match(t);
		return n != null ? unescape(n[2]) : null;
	};
	$.localStorage = function() {
		try {
			localStorage.setItem("test", 1);
			return !0;
		} catch (error) {
			return !1;
		}
	};
})(jQuery);