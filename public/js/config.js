angular
	.module('signals')
	.factory('config', [function () {
		return {
			'siteName' : 'Jobs',
			'templateUrl' : {
				'loggedInState' : 'template/logged-in-state',
				'profile' : 'template/profile',
				'company' : 'template/company',
				'jobForm' : 'template/job-form',
				'home' : 'template/home',
				'jobView' : 'template/job-view',
				'interest' : 'template/interest',
				'searchForm' : 'html/search-form.html',
				'search' : 'template/search'
			},
			'resourceUrl' : {
				'Profile' : 'data/profile',
				'Company' : 'data/company',
				'Job'     : 'data/job/:id',
				'Jobs'    : 'data/jobs',
				'JobInterested' : 'data/job/interested',
				'JobUninterested' : 'data/job/uninterested',
				'JobArchive' : 'data/job/archive/:id',
				'JobUnarchive' : 'data/job/unarchive',
				'JobsArchived' : 'data/jobs/archived',
				'InterestJobs' : 'data/interest/jobs',
				'InterestApplicants' : 'data/interest/applicants',
				'publicData' : {
					'Jobs' : 'public/data/jobs/:offset/:limit',
					'Job'  : 'public/data/job/:id',
					'Company' : 'public/data/company/:id',
					'CompanyJobs' : 'public/data/company/jobs/:id',
					'Profile' : 'public/data/profile/:id',
					"Search" : 'public/data/search/:id/:offset/:limit'
				}
			},
			'authUrl' : {
				'local' : {
					'signIn' : 'auth/local-signin',
					'signUp' : 'auth/local-signup'
				}, 
				'signOut' : 'auth/sign-out'
			},
			'successSignInRedirectToState' : 'home',
			'successSignOutRedirectToState' : 'home'
		};
	}]);