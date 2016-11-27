define(["apps/list/views/main"], function(view1) {
	var urlApi = "data/goods_list.php";
	return {
		main: function() {
			this.mainView = new view1(urlApi);
			this.mainView.render();
		}
	};
});