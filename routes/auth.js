module.exports = [	'express',
					'passport',
					'config',
					'path', function (express, passport, config, path) {

	var
		router = express.Router();

	router.get('/google/:return?', passport.authenticate('google', {
		successRedirect : config['auth.google.successRedirect'],
		scope : ['email']
	}));

	router.get('/facebook/:return?', passport.authenticate('facebook', {
		successRedirect : config['auth.facebook.successRedirect'],
		scope : ['email', 'public_profile']
	}));

	router.get('/local-signup', function (req, res) {
		res.render('auth/local-signup', { title : ['Sign Up', config.siteName].join(' | ') });
	});

	router.post('/local-signup', function (req, res, next) {

		passport.authenticate('local-signup', function (err, user, info) {
			if (err) {
				return res.status(500).json(err);
			}
			req.login(user, function (err) {
				if (err) {
					return res.status(500).json(err);
				}
				return res.json({ code : 'successSignUp', msg : 'Sign up is successful' });
			});
		})(req, res, next);
	});

	router.get('/local-signin', function (req, res) {
		res.render('local-signin', {});
	});

	router.post('/local-signin', function (req, res, next) {
		passport.authenticate('local-signin', function (err, user, info) {
			console.log('a');
			if (err) {
				console.log('b');
				return res.status(500).json(err);
			}
			req.login(user, function (err) {
				if (err) {
					return res.status(500).json(err);
				}
				return res.json({ code : 'successSignIn', user : user });
			});
		})(req, res, next);
	});

	router.get('/sign-out', function (req, res) {
		req.logout();
		res.json({
			code : 'successSignOut',
			msg : 'You have been signed out'
		});
	});

	router.get('/oauth-success', function (req, res) {
		res.sendFile('success.html', { root : path.join(__dirname, '../public', 'html') });
	});

	return router;

}];