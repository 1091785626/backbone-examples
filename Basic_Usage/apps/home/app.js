define(["apps/home/views/main"], function(view1) {
	var urlApi = "api/home";
	var urlApi = "data/home.php";
	return {
		main: function() {
			this.mainView = new view1(urlApi);
		}
	};
});