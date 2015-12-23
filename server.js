module.exports = function (express, config) {
	
	var
		app = express();

	app.get('/', function (req, res) {
		res.send('hei yo, dic here');
	});

	app.listen(config.port);

}