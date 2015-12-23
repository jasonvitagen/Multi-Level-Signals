var
	container = require('./dic')();

container.includeFiles(['server', 'config']);

container.get('server');