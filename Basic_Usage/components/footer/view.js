define(["doT","text!components/footer/tpl.html","components/footer/model"],function (doT,tpl,Model) {
    var urlApi = 'data/footer.php';
    return Backbone.View.extend({
        className:'view-footer',
        template: doT.template(tpl),
        events : {
            'click .js-footer-put':'footerPut',
            'click .js-footer-destroy':'footerDestroy'
        },
        initialize : function() {
            this.model = new Model(urlApi);
            this.model.on('sync',this.render,this);//用于渲染
            this.listenTo(this.model, 'destroy', this.remove);//用于删除视图
            this.model.fetch({
                error:function(){
                    $.catchError();
                }
            });
        },
        render : function() {
            $('#views').append(this.$el.html(this.template(this.model.toJSON())));
        },
        footerDestroy:function(event){
            var _this = this;
            layer.open({
                title:'删除footer导航',
                content: '您确定要删除吗？',
                btn: ['确定', '取消'],
                className:'layer-init',
                yes: function(index){
                    _this.model.destroy({
                        success:function(model,response){//保存成功执行
                            layer.close(index);
                        },
                        error:function(model,response,xhr) {//404//或者其他错误
                            layer.open({
                                content:response.status!=200?'异常错误':response.responseText,
                                time:1.5
                            });
                        }
                    });
                }
            });
            
        },
        footerPut:function(event){            
            this.model.set({
                style:this.model.get('style')?0:1
            });
            this.model.save(null,{
                success:function(model,response){//保存成功执行

                },
                error:function(model,response,xhr) {//404//或者其他错误
                    layer.open({
                        content:response.status!=200?'异常错误':response.responseText,
                        time:1.5
                    });
                }

            });
        }
    });
});