requirejs.config({
	//urlArgs:'v='+ (new Date()).getTime(),
	baseUrl: 'js',
	paths:{
		jquery:'lib/jquery',
		underscore:'lib/underscore',
		doT:'lib/doT',
		backbone:'lib/backbone',
		fastclick:'lib/fastclick',
		text: 'lib/text',
		paginator:'lib/backbone.paginator',
		lazyload:'lib/jquery.lazyload',
		layer:'plugin/layer/layer',
		mobiscroll:'plugin/mobiscroll/jquery.mobiscroll',
		area:'plugin/area/area',
		self:'self',
		swiper:'lib/swiper',
		apps:'../apps',
		components:'../components',

	},
	shim:{
		'backbone':{
			deps:['underscore','doT','jquery'],
			exports:'Backbone'
		},
		'mobiscroll':{
			deps:['jquery'],
		},
		'area':{
			deps:['jquery'],
		},
		'self':{
			deps:['jquery']
		},
		'underscore':{
			exports:'_'
		},
		'jquery':{
			exports:'$'
		},
		'doT':{
			exports:'doT'
		}
	}
});
requirejs(['app'], function(app){
     app.initialize();
});
