module.exports = [	'express',
					'config',
					'path',
					'morgan',
					'routes.root',
					'routes.auth',
					'routes.template',
					'ejs',
					'body-parser',
					'cookie-parser',
					'middlewares.htmlSanitizer',
					'middlewares.addUser',
					'express-session',
					'connect-redis',
					'setup.redisClient',
					'passport', function (express, config, path, morgan, rootRoute, authRoute, templateRoute, ejs, bodyParser, cookieParser, htmlSanitizer, addUser, session, connectRedis, redisClient, passport) {

	var
		app = express()
		, RedisStore = connectRedis(session);

	app.engine('ejs', ejs.__express); // use ejs templating engine
	app.set('view engine', 'ejs');
	app.set('views', path.join(__dirname, 'views'));

	app.set('json spaces', 2);

	app.use(morgan('dev'));

	app.use(cookieParser());

	app.use(bodyParser.urlencoded({ extended : false, limit : config['urlencoded.limit'] }));
	app.use(bodyParser.json({ limit : config['jsonencoded.limit'] }))
	app.use(htmlSanitizer);
	app.use(session({
		name : config['session.name'],
		resave : false,
		saveUninitialized : false,
		secret : config['session.secret'],
		cookie : {
			maxAge : config['session.maxAge']
		},
		client : new RedisStore({
			client : redisClient
		})
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(addUser);

	app.use(express.static(path.join(__dirname, config.staticPath), {
		maxAge : config.staticMaxAge
	}));

	app.use('/', rootRoute);
	app.use('/auth', authRoute);
	app.use('/template', templateRoute);

	if (app.get('env') === 'development') {
		app.use(function (err, req, res, next) {
			res
				.status(err.status || 500)
				.json({
					msg : err.message,
					err : err
				});
		});
	}

	app.use(function (err, req, res, next) {
		res
			.status(err.status || 500)
			.json({
				msg : err.message
			});
	});

	app.listen(config.port);

}];