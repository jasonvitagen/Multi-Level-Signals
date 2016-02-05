var
	container = require('./dic')();

container.includeFolder(['modules', 'setup', 'middlewares'], { prefixFolderName : true });

container.includeFiles(['server', 'config']);

container.get('server');