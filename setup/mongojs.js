module.exports = [	'mongojs'
					, 'config'
					, 'modules.logger'
					, function (mongojs, config, logger) {

	var
		databaseUrl = config.mongodb.databaseUrl
		, db = mongojs(databaseUrl, []);

	db.on('error', function (err) {
		logger.error(err);
		console.log(err);
	});

	db.on('ready', function () {
		console.log('Connected to mongo db');
	});

	return db;

}];