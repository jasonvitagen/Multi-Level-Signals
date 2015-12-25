module.exports = [	'express',
					'config',
					'path',
					'morgan',
					'routes.root',
					'ejs',
					'body-parser',
					'cookie-parser',
					'middlewares.htmlSanitizer', function (express, config, path, morgan, rootRoutes, ejs, bodyParser, cookieParser, htmlSanitizer) {
	






var
	app = express();

app.engine('ejs', ejs.__express); // use ejs templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended : false, limit : config['urlencoded.limit'] }));
app.use(bodyParser.json({ limit : config['jsonencoded.limit'] }))
app.use(htmlSanitizer);


app.use(express.static(path.join(__dirname, config.staticPath), {
	maxAge : config.staticMaxAge
}));

app.use('/', rootRoutes);

if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		console.log(err.message);
		res
			.status(err.status || 500)
			.json({
				msg : err.message,
				err : err
			})
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