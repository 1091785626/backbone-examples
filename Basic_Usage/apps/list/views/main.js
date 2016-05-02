define(['doT',
	'apps/list/collections/collections',
	'apps/list/views/item',
	'text!apps/list/templates/main.html','components/modules/search/view','lazyload'],
function (doT,Collections,itemView,mainTpl,searchView){
	return Backbone.View.extend({
		id:'view-list',
		template:doT.template(mainTpl),
		initialize:function(urlApi){
			$.setTitle("列表详情");
			$("#views").append(this.$el);
			this.keyword=$.getUrlParam('keyword')||null;//?&keyword
			this.type=$.getUrlParam('type')||null;
			this.collection = new  Collections(urlApi,this.type,this.keyword);
        	this.collection.on("sync", this.renderEach, this);
        	this.collection.fetch({
                error:function(){
                    $.catchError();
                }
            });
		},
		render:function(){
			var data={
				keyword: this.keyword
			};
			this.$el.html(this.template());
            $('.list-search').append(new searchView({model:data}).render().$el);//渲染搜索
			this.bottomLoad();
			$.loading('hide');
		},
		renderEach: function() {
            $(".dropload-down", this.$el).loading("hide");
            if (this.collection.state.totalRecords === 0) {
                $('.dropload-down').html('<div class="empty-html">没有找到</div>');
                $('.list-filter').addClass('disabled');
            }else{
                $('.list-filter').removeClass('disabled');
            	this.collection.each(this.renderItem,this);//遍历完才执行下面
            	this.$("img.lazy").lazyload();
            	this.isRequest = 0;
            }
        },
        renderItem: function(model) {
            $(".goodsitem").append((new itemView({model: model})).render().$el);
            $(".dropload-down").loading("hide");
            if(this.collection.state.totalRecords<=this.collection.state.pageSize){
                $(".dropload-down").html('已无更多'); 
            }else{
                $(".dropload-down").html('上拉加载更多'); 
            }
            
            $("img.lazy").lazyload({placeholder : "images/grey.gif"});
        },
        bottomLoad: function() {
        	this.isRequest = 0;
            var self = this;
            $(window).on("scroll",function() {
                var top = $(window).scrollTop(),
                r = $(document).height(),
                i = $(window).height();
                if(top >= r - i- 100 && self.collection.hasNextPage()&&self.isRequest === 0){
                	self.isRequest = 1;
                    $(".dropload-down").loading("show");
                    self.collection.getNextPage();
                   
                }else if(!self.collection.hasNextPage()){
                	$(".dropload-down").html('已无更多');
                }
            });
        }
	});
});