({
	appDir: './',
	baseUrl: './',
	dir: './dist',
	removeCombined: true,
	fileExclusionRegExp: /^(r.js|build.js|wds_pack.bat|wepay.html)$/,
	optimizeCss: 'standard',
	paths: {
		jquery: 'js/lib/jquery',
		underscore: 'js/lib/underscore',
		doT: 'js/lib/doT',
		backbone: 'js/lib/backbone',
		fastclick: 'js/lib/fastclick',
		text: 'js/lib/text',
		paginator: 'js/lib/backbone.paginator',
		lazyload: 'js/lib/jquery.lazyload',
		layer: 'js/plugin/layer/layer',
		mobiscroll: 'js/plugin/mobiscroll/jquery.mobiscroll',
		area: 'js/plugin/area/area',
		swiper: 'js/lib/swiper',
		wx: 'http://res.wx.qq.com/open/js/jweixin-1.1.0',
		app: 'js/app',
		self: 'js/self',
		router: 'js/router'
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'doT', 'jquery'],
			exports: 'Backbone'
		},
		'mobiscroll': {
			deps: ['jquery']
		},
		'area': {
			deps: ['jquery']
		},
		'self': {
			deps: ['jquery']
		},
		'underscore': {
			exports: '_'
		},
		'jquery': {
			exports: '$'
		},
		'doT': {
			exports: 'doT' //好像并不起作用
		}
	},
	modules: [
		{
			name: "js/main",
			include: ['text', 'paginator', 'lazyload', 'swiper', 'app', 'self', 'router'],
			excludeShallow: ['area', 'jcrop', 'mobiscroll']
		}, 
		{
			name: "apps/goods/app",
			excludeShallow: ['doT', 'text', 'jquery', 'swiper', 'backbone', 'paginator', 'underscore', 'lazyload', 'layer', 'area', 'mobiscroll']
		}, 
		{
			name: "apps/home/app",
			excludeShallow: ['doT', 'text', 'jquery', 'swiper', 'backbone', 'paginator', 'underscore', 'lazyload', 'layer', 'area', 'mobiscroll']
		}, 
		{
			name: "apps/list/app",
			excludeShallow: ['doT', 'text', 'jquery', 'swiper', 'backbone', 'paginator', 'underscore', 'lazyload', 'layer', 'area', 'mobiscroll']
		}, 
		{
			name: "apps/user/app",
			excludeShallow: ['doT', 'text', 'jquery', 'swiper', 'backbone', 'paginator', 'underscore', 'lazyload', 'layer', 'area', 'mobiscroll']
		}

	]
})