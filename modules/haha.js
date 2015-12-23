module.exports = function () {
	var i = 0;
	return function () {
		console.log(i);
		console.log('wow wow');
		i++;
	}
}
