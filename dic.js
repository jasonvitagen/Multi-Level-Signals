var
	argsList = require('args-list')
	, fs = require('fs')
	, path = require('path')
	, containers = {}
	, Container = function (name) {
		this.name = name;
		this.values = {};
		this.factories = {};
	};

Container.prototype.value = function (name, value) {
	this.values[name] = value;
}

Container.prototype.factory = function (name, factory) {
	this.factories[name] = factory;
}

Container.prototype.get = function (name) {
	if (this.values[name]) {
		return this.values[name];
	}
	if (this.factories[name]) {
		this.values[name] = this.inject(this.factories[name]);
		return this.values[name];
	}
	try {
		return require(name);
	} catch (err) {
		throw err;
	}

}

Container.prototype.inject = function (factory) {
	var
		args
		, dependencies;
	if (Object.prototype.toString.call(factory) == '[object Array]') {
		args = factory.slice(0, -1);
		factory = factory.pop();
	} else {
		args = argsList(factory);
	}
	dependencies = args.map(function (dependency) {
		return this.get(dependency);
	}.bind(this));
	return factory.apply(null, dependencies);
}

Container.prototype.includeFolder = function (folders, options) {
	var
		fileNames = [];
	folders.forEach(function (folder) {
		fs.readdirSync(folder)
			.filter(function (file) {
				return fs.statSync(path.resolve(folder, file)).isFile();
			})
			.forEach(function (file) {
				var
					fileName = path.basename(file, '.js')
					, fileContent = require(path.resolve(folder, file));
				if (options
					&& options.addPrefix) {
					fileName = folder + '.' + fileName;
				}
				fileNames.push(fileName);
				if (Object.prototype.toString.call(fileContent) == '[object Function]'
					|| Object.prototype.toString.call(fileContent) == '[object Array]') {
					return this.factory(fileName, fileContent);
				}
				this.value(fileName, fileContent);
			}.bind(this));
	}.bind(this));
	if (options.initialize) {
		fileNames.forEach(function (fileName) {
			this.get(fileName);
		}.bind(this));
	}
}

Container.prototype.includeFiles = function (files) {
	files.forEach(function (file) {
		var
			fileName = path.basename(file, '.js')
			, fileContent = require(path.resolve(file));
		if (Object.prototype.toString.call(fileContent) == '[object Function]'
			|| Object.prototype.toString.call(fileContent) == '[object Array]') {
			return this.factory(fileName, fileContent);
		}
		this.value(fileName, fileContent);
	}.bind(this));
}

module.exports = function (name) {
	if (!name) {
		name = 'default';
	}
	if (containers[name]) {
		return containers[name];
	}
	containers[name] = new Container(name);
	return containers[name];
}