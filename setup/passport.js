module.exports = [	'passport'
					, 'passport-google-oauth'
					, 'passport-facebook'
					, 'passport-local'
					, 'setup.mongojs'
					, 'modules.logger'
					, 'bcrypt-nodejs'
					, 'config'
					, function (passport
								, passportGoogleOauth
								, passportFacebook
								, passportLocal
								, db
								, logger
								, bcrypt
								, config) {

	var
		GoogleStrategy = passportGoogleOauth.OAuth2Strategy
		, FacebookStrategy = passportFacebook.Strategy
		, LocalStrategy = passportLocal.Strategy;

	passport.serializeUser(function (user, done) { done(null, user) });
	passport.deserializeUser(function (user, done) { done(null, user) });

	passport.use(new GoogleStrategy({
		clientID          : config.auth.google.clientID,
		clientSecret      : config.auth.google.clientSecret,
		callbackURL       : [config.host, config.auth.google.callbackURL].join(''),
		passReqToCallback : true
	}, function (req, accessToken, refreshToken, profile, done) {
		process.nextTick(function () {
			if (req.user) {
				return done(null, req.user);
			}
			db.User.findOne({ 'google.id' : profile.id }, function (err, user) {
				if (err) {
					logger.error(err);
					return done({ code : 'mongoError', msg : err });
				}
				var $set = {
					'email'        : profile.emails.length > 0 && profile.emails[0].value,
					'google.id'    : profile.id,
					'google.email' : profile.emails.length > 0 && profile.emails[0].value,
					'google.name'  : profile.displayName
				};

				db.User.findAndModify({
					query  : { 'google.id' : profile.id },
					update : {
						$set : $set
					},
					upsert : true,
					new    : true
				}, function (err, doc) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done(null, doc);
				});

			});
		});
	}));

	passport.use(new FacebookStrategy({
		clientID          : config.auth.facebook.clientID,
		clientSecret      : config.auth.facebook.clientSecret,
		callbackURL       : [config.host, config.auth.facebook.callbackURL].join(''),
		profileFields     : ['email'],
		passReqToCallback : true
	}, function (req, accessToken, refreshToken, profile, done) {
		process.nextTick(function () {
			if (req.user) {
				return done(null, req.user);
			}
			db.User.findOne({ 'facebook.id' : profile.id }, function (err, user) {
				if (err) {
					logger.error(err);
					return done({ code : 'mongoError', msg : err });
				}
				var $set = {
					'email'          : profile.emails.length > 0 && profile.emails[0].value,
					'facebook.id'    : profile.id,
					'facebook.email' : profile.emails.length > 0 && profile.emails[0].value,
					'facebook.name'  : profile.displayName
				};

				db.User.findAndModify({
					query  : { 'facebook.id' : profile.id },
					update : {
						$set : $set
					},
					upsert : true,
					new    : true
				}, function (err, doc) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done(null, doc);
				});
			});
		});
	}));

	passport.use('local-signin', new LocalStrategy({
		usernameField     : 'email',
		passwordField     : 'password',
		passReqToCallback : true
	}, function (req, email, password, done) {
		process.nextTick(function () {
			if (req.user) {
				return done(null, req.user);
			}
			db.User.findOne({ 'local.email' : email }, function (err, user) {
				if (err) {
					logger.error(err);
					return done({ code : 'mongoError', msg : err });
				}
				if (user) {
					if (bcrypt.compareSync(password, user.local.password)) {
						delete user.local.password;
						return done(null, user);
					} else {
						return done({ code : 'signInError', msg : 'Invalid username or password' });
					}
				}
				return done({ code : 'signInError', msg : 'Invalid username or password' });
			});
		});
	}));

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, function (req, email, password, done) {
		process.nextTick(function () {
			if (req.user) {
				return done(null, req.user);
			}

			db.User.findOne({ 'local.email' : email }, { 'local.password' : 0 }, function (err, user) {
				if (err) {
					logger.error(err);
					return done({ code : 'mongoError', msg : err });
				}
				if (user) {
					return done({ code : 'userExists', msg : 'User exists' });
				}

				var newUser = {
					email : email,
					local : {
						email : email,
						password : bcrypt.hashSync(password)
					}
				};

				db.User.insert(newUser, function (err, result) {
					if (err) {
						logger.error(err);
						throw err;
					}
					done(null, newUser);
				});
			});
		});
	}));

}];