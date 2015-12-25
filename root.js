var
	container = require('./dic')();

container.includeFolder(['routes', 'middlewares'], {
	addPrefix : true
});

container.includeFiles(['server', 'config']);



container.get('server');