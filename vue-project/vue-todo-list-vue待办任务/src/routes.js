(function (app, Router) {

	'use strict';

	var router = new Router();

	['all', 'active', 'completed'].forEach(function (hashName) {
		router.on(hashName, function () {
			app.hashName = hashName;
		});
	});

	router.configure({
		notfound: function () {
			window.location.hash = '';
			app.hashName = 'all';
		}
	});

	router.init();

})(app, Router);
