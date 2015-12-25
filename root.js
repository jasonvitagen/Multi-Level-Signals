var
	container = require('./dic')();

container.includeFolder(['routes', 'middlewares', 'modules'], {
	addPrefix : true
});

container.includeFiles(['server', 'config']);

container.includeFolder(['setup'], {
	addPrefix : true,
	initialize : true
});

container.get('server');