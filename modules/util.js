module.exports = [function () {

	var utils = {};

	utils.pick = function (keys) {
		return function (obj) {
			return keys.reduce(function (newObj, key) {
				if (key.indexOf('.') > -1) {
					newObj[key.replace(/\.(.{1})/g, function (x, y) { return y.toUpperCase() })] = key.split('.').reduce(function (newObj2, key2) {
						return newObj2[key2];
					}, obj);
					return newObj;
				}
				newObj[key] = obj[key];
				return newObj;
			}, {});
		};
	};

	return utils;

}];