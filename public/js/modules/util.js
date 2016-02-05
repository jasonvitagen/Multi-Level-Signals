angular
	.module('util', [])
	.factory('hashCode', [function () {
		return function (str) {
			var hash = 0, i, chr, len;
			  if (str.length == 0) return hash;
			  for (i = 0, len = str.length; i < len; i++) {
			    chr   = str.charCodeAt(i);
			    hash  = ((hash << 5) - hash) + chr;
			    hash |= 0; // Convert to 32bit integer
			  }
			  return hash;
		}
	}])
	.service('once', ['hashCode', '$timeout', function (hashCode, $timeout) {

		var
			callbackHashes = []
			, once = function (callback, duration) {
				var callbackHashCode = hashCode(callback.toString());
				if (callbackHashes.indexOf(callbackHashCode) > -1) {
					return;
				}
				callbackHashes.push(callbackHashCode);
				$timeout(function () {
					callback.call();
					callbackHashes.splice(callbackHashes.indexOf(callbackHashCode), 1);
				}, duration);
			};

		return once;

	}])
	.factory('pubsub', [function () {
		var
			apis = {}
			, subscribers = {}
			, initializeSubscriber = function (eventName) {
				if (!subscribers[eventName]) {
					subscribers[eventName] = {};
				}
			};

		apis.publish = function (eventName, args) {
			var subscriberCallbacks = [];
			for (var subscriberName in subscribers[eventName]) { // retrieve callbacks as array from object
				subscriberCallbacks.push(subscribers[eventName][subscriberName]);
			}
			async.each(subscriberCallbacks, function (subscriberCallback, done) {
				return subscriberCallback(args, done);
			});
		};

		apis.subscribe = function (eventName, subscriberName, callback) {
			initializeSubscriber(eventName);
			subscribers[eventName][subscriberName] = callback;
		};

		return apis;
	}]);