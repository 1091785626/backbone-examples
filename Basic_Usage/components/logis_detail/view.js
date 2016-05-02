define(["doT","text!components/logis_detail/tpl.html","components/logis_detail/model"],function (doT,tpl,Model) {
    var api_url = 'data/order_logis.php';
    return Backbone.View.extend({
        //className:'view-footer',
        template: doT.template(tpl),
        events: {
            "click .close": "closeModal"
        },
        initialize : function(order_id) {
            this.model = new Model(api_url);
            this.model.on('sync',this.render,this);
            this.model.fetch({
                data:{order_id:order_id},
                error:function(){
                    $.catchError();
                }
            });
        },
        render : function() {
            $('#popup').append(this.$el.html(this.template(this.model.toJSON())));
        },
        closeModal: function() {
            var self=this;
            $(".fixed").animate({bottom:'-38rem'},500,function(){
                $("#popup").empty();
                self.undelegateEvents();//去除绑定事件
            });
        }
    });
});