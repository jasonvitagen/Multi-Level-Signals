var
	container = require('./dic')();

container.includeFolder(['modules', 'setup', 'middlewares'], true);

container.includeFiles(['server', 'config']);

container.get('server');