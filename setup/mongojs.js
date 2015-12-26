module.exports = [	'mongojs',
					'config', function (mongojs, config) {

	var
		databaseUrl = config['mongodb.databaseUrl']
		, db = mongojs(databaseUrl, ['User']);

	db.on('error', function (err) {
		console.log(err);
	});

	db.on('ready', function () {
		console.log('Connected to mongo db');
	});

	return db;

}];