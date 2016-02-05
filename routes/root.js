module.exports = [	'express',
					'path',
					'config', function (express, path, config) {

	var
		router = express.Router();

	router.get('/', function (req, res) {
		res.render('root', { title : ['Home', config.siteName].join(' | ') });
	});

	return router;

}];