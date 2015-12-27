module.exports = ['modules.restfulApi', function (restfulApi) {

	restfulApi.use('template.LoggedInState', 'GET', function (resourceName, req, res, done) {
		console.log('sdfdsfddsfds');
		if (!req.isAuthenticated()) {
			res.render('not-logged-in', {});
			return done();			
		}
		res.render('logged-in', {});
		done();
	});

}];