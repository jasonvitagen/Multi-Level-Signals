angular
	.module('signals')
	.filter('yesNo', [function () {
		return function (bool) {
			return bool ? 'Yes' : 'No';
		}
	}])
	.filter('timeStamp', [function () {
		return function (url) {
			return url.indexOf('?') > -1 ? [url, '&time=', Date.now()].join('') : [url, '?time=', Date.now()].join('');
		}
	}])
	.filter('trustAsResourceUrl', ['$sce', function ($sce) {
		return function (val) {
			return $sce.trustAsResourceUrl(val);
		}
	}])
	.filter('trustAsHtml', ['$sce', function ($sce) {
		return $sce.trustAsHtml;
	}])
	.filter('map', [function () {
		return function (list, propertyName) {
			if (!list) {
				return list;
			}
			console.log(list);
			return list.map(function (item) {
				return item[propertyName];
			});
		}
	}])
	.filter('join', [function () {
		return function (list, delimiter) {
			if (!list) {
				return list;
			}
			return list.join(delimiter);
		}
	}]);