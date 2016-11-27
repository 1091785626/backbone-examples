define(['backbone', 'fastclick', 'jquery', 'layer', 'self'], function(Backbone, Fastclick, $) {
	"use strict";
	Fastclick.attach(document.body);
	/**
	 * 下面定义一些方法；当然你也可以放入js/self 自定义的插件里，放在这里主要是方便修改
	 */
	$.pageInit = function() {
		/**
		 * 页面初始化相关操作
		 */
		$(window).unbind('scroll');
		$('.scroll-fixed-btn').unbind('click');
		$(".indicator-overlay, .indicator-modal").remove();
		/**
		 * 清理单页面的方法
		 */
		$("#views,#popup").empty();

		/**
		 * 清除缓存的临时数据 本项目需要用到
		 */
		if ($.localStorage) {
			sessionStorage.removeItem("selected");
			sessionStorage.removeItem("skudata");
		}
	};
	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'user(/:action)': 'user',
			'goods/:id': 'goods',
			'list': 'list',
			'*actions': 'defaultAction'
		},
		initialize: function() {
			/**
			 * 路由初始化可以做一些事//执行一次
			 */
			$(".loading-modal").remove();
			this.backUrl = '';
			/**
			 * 清除缓存的临时数据 本项目需要用到
			 */
			if ($.localStorage) {
				localStorage.removeItem("area");
				localStorage.removeItem("footer");
			}
		},
		home: function() {
			this.loading();
			require(['apps/home/app'], function(app) {
				app.main();
			});
		},
		user: function(action) {
			this.loading();
			require(['apps/user/app'], function(app) {
				app.main(action);
			});
		},
		goods: function(id) {
			this.loading();
			require(['apps/goods/app'], function(app) {
				app.main(id);
			});
		},
		list: function() {
			this.loading();
			require(['apps/list/app'], function(app) {
				app.main();
			});
		},
		loading: function() {
			$.loading();
			$.pageInit();
			this.backUrl = window.location.hash;
		},
		defaultAction: function() {
			var self = this;
			layer.open({
				content: '页面正在开发中',
				time: 1.5,
				end: function() {
					Backbone.history.navigate(self.backUrl, {
						trigger: !0,
						replace: !0
					});
				}
			});
		}
	});
	return Router;
});