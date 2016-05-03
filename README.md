#Backbone+RequireJS
###选择的原因：
入门简单，可依赖jQuery，MVC模式，最主要的原因在于公司移动端项目没人负责，扛起大旗研究了一番，一路磕磕碰碰，完成底层搭建和后期工作完成整个项目。给我带来最大的帮助模块化和组件化，以及工具等相关自定义和插件的运用。这里主要介绍项目的搭建和一些注意用法，可以下载后用wampserver直接运行测试数据
###感谢促使我一路成长各大社区论坛，好心人。
感谢以下的博客

* [Backbone API中文文档](http://www.css88.com/doc/backbone/)
* [Backbone 使用总结](https://segmentfault.com/a/1190000000589218) 
* [Backbone 的技巧和模式](http://blog.jobbole.com/46420/)


###项目其他依赖，UI及其他方法自己定义，毕竟Backbone只提供了MVC框架
 
* doT.js------------------------------模版渲染引擎 替代原有的
* layer.mobile.js------------------弹出层 顺便将其UI自定义；
* backbone.paginator.js-------用于项目的集合分页，取代原Backbone集合功能
* fastclick.js
* swiper.js
* .....

###一、项目的目录及其功能，方便管理
<pre>
Backbone      
├─apps                     可以理解为pages，页面路由，控制组件排列
│  │
│  ├─list                  定义路由为#list
│  │  ├─collections        数据集合
│  │  ├─templates          模版文件
│  │  ├─views              视图与控制
│  │  └─app.js             路由入口文件，配置参数urlapi和其他
│  │ 
│  └─user                  定义路由为#user
│      ├─models            数据模型    
│      ├─templates    
│      ├─views 
│      ├─modules           用于二级路由，三级路由
│      │  ├─edit           定义二级路由#user/edit
│      │  ├─edit_addr      定义三级路由#user/edit_addr
│      │  ├─edit_info      ....
│      │  └─modules.js     二、三级路由的配置
│      └─app.js 
│   ......          
├─components               组件UI
│  │              
│  ├─header                顶部
│  │   ├─tpl.html          模版
│  │   └─view.js           视图与控制
│  ├─footer                ....
│  └─modules               自定义模块渲染
│  .......          
├─css                      样式地址；
├─data                     前端配合后台模拟的数据，下面会介绍一种静态的restful模拟，可以直接用
├─js                       
│  ├─lib                   项目依赖（合并形成一个文件）
│  ├─plugin                额外用的插件，为了压缩合并独立
│  └─self                  定义一些方法，比如验证正则等；如果是小量的，可以直接在router.js定义
│                   
└─index.html               项目的单页面入口，可以在这里定义全局的变量；
</pre>
###二、项目构建

###三、核心部分数据模型增删改查，渲染页面，其他问题


###四、个人未来学习方向
* gulp、webpack等运用
* React Native 用js搭建的原生应用，提升自己的javascript；
* AngularJS 用此搭建后台管理系统；
* Node.js 学会搭建服务器； 
* 加油、加油、一个坚持梦想的男人！
#####疏漏之处请指正，谢谢！问题意见联系 zrd0921@qq.com
