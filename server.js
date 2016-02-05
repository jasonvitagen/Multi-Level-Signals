module.exports = [	'express'
					, 'config'
					, 'modules.logger'
					, 'morgan'
					, 'cookie-parser'
					, 'body-parser'
					, 'express-session'
					, 'connect-redis'
					, 'fs'
					, 'path'
					, 'passport'
					, 'serve-favicon'
					, 'setup.redisClient'
					, 'middlewares.htmlSanitizer'
					, 'ejs'
					, 'setup.passport'
					, function (express 
								, config
								, logger
								, restLogger
								, cookieParser
								, bodyParser
								, session
								, connectRedis
								, fs
								, path
								, passport
								, favicon
								, redisClient
								, htmlSanitizer
								, ejs
								, setupPassport) {
	
	var
		app = express()
		, RedisStore = connectRedis(session);

	app.enable('trust proxy');

	app.engine('ejs', ejs.__express);
	app.set('view engine', 'ejs');
	app.set('views', path.join(__dirname, 'views'));

	app.locals.config = config;

	app.use(restLogger('dev'));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({ extended : false, limit : config.urlencoded.limit }));
	app.use(bodyParser.json({ limit : config.jsonencoded.limit }));
	app.use(htmlSanitizer);
	app.use(session({
		name   : config.session.name,
		resave : false,
		saveUninitialized : false,
		secret : config.session.secret,
		cookie : {
			maxAge : config.session.maxAge
		},
		client : new RedisStore({
			client : redisClient
		})
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	if (!fs.existsSync(path.join(__dirname, config.staticPath))) { // check and create static directory
		fs.mkdirSync(path.join(__dirname, config.staticPath));
	}
	app.use(express.static(path.join(__dirname, config.staticPath), {
		maxAge : config.staticMaxAge
	})); // serve static files
	app.use(function (req, res, next) { // 404 catcher
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});
	if (app.get('env') === 'development') { // development error handler
		app.use(function (err, req, res, next) {
			res
				.status(err.status || 500)
				.json({
					msg : err.message
				});
		});
	}
	app.use(function (err, req, res, next) { // production error handler
		res
			.status(err.status || 500)
			.send(err.message);
	});

	app.listen(config.port);

}];