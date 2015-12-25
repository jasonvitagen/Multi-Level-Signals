'use strict';

// Variables, Dependencies and Helper Functions
var
	apis = {} // to wrap all exposable apis of this module
	, middlewares = {} // to store middlewares for each type of resource
	, initializeResource = function (resourceName, methodName) { // to make sure resource exists before writing to it
		if (!(resourceName in middlewares)) {
			middlewares[resourceName] = {};
		}
		if (!(methodName in middlewares[resourceName])) {
			middlewares[resourceName][methodName] = [];
		}
	}
	, async = require('async')
	, use1 = function (resourceNames, methodNames, methodCallback) {
		if (!(Object.prototype.toString.call(resourceNames) === '[object Array]')) {
			resourceNames = [resourceNames];
		}
		if (!(Object.prototype.toString.call(methodNames) === '[object Array]')) {
			methodNames = [methodNames];
		}
		resourceNames.forEach(function (resourceName) {
			methodNames.forEach(function (methodName) {
				initializeResource(resourceName, methodName);
				middlewares[resourceName][methodName].push(methodCallback);
			});
		});
	}
	, use2 = function (resourceAndMethodNames, methodCallback) {
		if (!(Object.prototype.toString.call(resourceAndMethodNames) === '[object Array]')) {
			resourceAndMethodNames = [resourceAndMethodNames];
		}
		resourceAndMethodNames.forEach(function (resourceAndMethodName) {
			var
				resourceName = Object.keys(resourceAndMethodName).pop()
				, methodNames = resourceAndMethodName[resourceName];
			if (Object.prototype.toString.call(methodNames) !== '[object Array]') {
				methodNames = [methodNames];
			}
			methodNames.forEach(function (methodName) {
				initializeResource(resourceName, methodName);
				middlewares[resourceName][methodName].push(methodCallback);
			});
		});
	}

apis.use = function () { // overloaded

	var
		params = Array.prototype.slice.call(arguments);

	switch (params.length) {
		case 2 :
			use2.apply(null, params);
		break;
		case 3 :
			use1.apply(null, params);
		break;
	}

};

// API External Methods
apis.restful = function (resourceName) {
	return function (req, res, next) {
		var resourceMiddlewares;
		try {
			resourceMiddlewares = middlewares[resourceName][req.method]; // try to get middlewares for that resource and HTTP method
		} catch (err) {
			next(err);
		};
		async.eachSeries(resourceMiddlewares, function (resourceMiddleware, done) { // run permission check
			resourceMiddleware(resourceName, req, res, done);
		}, function (err) {
			if (err === 'stopAsync') {
				return;
			}
			if (err) {
				return res.status(500).json(err);
			}
		});
	}
};

module.exports = apis;