module.exports = [	'redis'
					, 'modules.logger'
					, function (redis
								, logger) {

	var
		redisClient = redis.createClient();

	redisClient.on('ready', function () { 
		console.log('Redis is ready') 
	});

	redisClient.on('error', function () {
		logger.error('Failed to connect to redis');
		console.log('Failed to connect to Redis');
	});

	return redisClient;

}];