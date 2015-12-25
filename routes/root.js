module.exports = [	'express',
					'path', function (express, path) {

	var
		router = express.Router();

	router.get('/', function (req, res) {
		res.sendFile('root.html', { root : path.join(__dirname, '../public', 'html') });
	});

	return router;

}];