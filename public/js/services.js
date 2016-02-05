angular
	.module('signals')
	.factory('resources', ['$resource', 'config', function ($resource, config) {

		var apis = {};

		apis.Profile = $resource(config['resourceUrl']['Profile']);
		apis.Company = $resource(config['resourceUrl']['Company']);
		apis.Job = $resource(config['resourceUrl']['Job']);
		apis.Jobs = $resource(config['resourceUrl']['Jobs']);
		apis.JobInterested = $resource(config['resourceUrl']['JobInterested']);
		apis.JobUninterested = $resource(config['resourceUrl']['JobUninterested']);
		apis.JobArchive = $resource(config['resourceUrl']['JobArchive']);
		apis.JobUnarchive = $resource(config['resourceUrl']['JobUnarchive']);
		apis.JobsArchived = $resource(config['resourceUrl']['JobsArchived']);
		apis.InterestJobs = $resource(config['resourceUrl']['InterestJobs']);
		apis.InterestApplicants = $resource(config['resourceUrl']['InterestApplicants']);
		apis.publicData = {
			Jobs : $resource(config['resourceUrl']['publicData']['Jobs']),
			Job  : $resource(config['resourceUrl']['publicData']['Job']),
			Company : $resource(config['resourceUrl']['publicData']['Company']),
			CompanyJobs : $resource(config['resourceUrl']['publicData']['CompanyJobs']),
			Profile : $resource(config['resourceUrl']['publicData']['Profile']),
			Search : $resource(config['resourceUrl']['publicData']['Search'])
		};

		return apis;

	}]);