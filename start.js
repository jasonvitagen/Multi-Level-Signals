var
	container = require('./dic')();

container.includeFolder(['modules', 'setup', 'middlewares', 'routes'], { prefixFolderName : true });

container.includeFiles(['server', 'config']);

container.get('server');