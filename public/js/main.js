angular
	.module('signals', ['ui.router', 'ui.bootstrap', 'ngToast', 'ngMessages', 'ngResource', 'ngTagsInput', 'ui.router.title', 'ui.router.fromState', 'util'])
	.config(['$urlRouterProvider', '$stateProvider', 'ngToastProvider', function ($urlRouterProvider, $stateProvider, ngToastProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url : '/',
				views : {
					'main' : {
						templateUrl : 'html/home.html',
						controller : 'homeCtrl'
					}
				},
				resolve : {
					$title : function () { return 'Home'; }
				}
			})
			.state('rootSignIn', {
				url : '/sign-in',
				views : {
					'main' : {
						templateUrl : 'html/root-sign-in.html'
					}
				},
				resolve : {
					$title : function () { return 'Sign In'; },
					$disablePrevState : function () { return true; }
				}
			})
			.state('rootSignIn.signIn', {
				url : '/',
				views : {
					'main' : {
						templateUrl : 'html/sign-in-form.html',
						controller  : 'signInCtrl'
					}
				},
				resolve : {
					$title : function () { return 'Sign In'; },
					$disablePrevState : function () { return true; }
				}
			})
			.state('rootSignIn.signUp', {
				url : '/sign-up',
				views : {
					'main' : {
						templateUrl : 'html/sign-up-form.html',
						controller  : 'signUpCtrl'
					}
				},
				resolve : {
					$title : function () { return 'Sign Up'; },
					$disablePrevState : function () { return true; }
				}
			})
			.state('rootControl', {
				url : '/control',
				views : {
					'main' : {
						templateUrl : 'html/root-control.html'
					}
				},
				resolve : {
					$title : function () { return 'Administration'; }
				}
			})
			.state('rootControl.profile', {
				url : '/profile',
				views : {
					'main' : {
						templateUrl : 'html/profile.html'
					}
				},
				resolve : {
					$title : function () { return 'Profile'; }
				}
			})
			.state('rootControl.company', {
				url : '/company',
				views : {
					'main' : {
						templateUrl : 'html/company.html'
					}
				},
				resolve : {
					$title : function () { return 'Company'; }
				}
			})
			.state('rootControl.job', {
				url : '/job-form',
				views : {
					'main' : {
						templateUrl : 'html/job-form.html'
					}
				},
				resolve : {
					$title : function () { return 'Job Form'; }
				}
			})
			.state('rootControl.interest', {
				url : '/interest',
				views : {
					'main' : {
						templateUrl : 'html/interest.html',
						controller  : 'interestCtrl'
					}
				},
				resolve : {
					$title : function () { return 'Job Interests'; }
				}
			})
			.state('rootControl.archivedJobs', {
				url : '/archived-jobs',
				views : {
					'main' : {
						templateUrl : 'html/archived-jobs.html',
						controller  : 'archivedJobsCtrl'
					}
				},
				resolve : {
					$title : function () { return 'Archived Jobs'; }
				}
			})
			.state('guide', {
				url : '/guide',
				views : {
					'main' : {
						templateUrl : 'html/guide.html',
						controller  : 'guideCtrl'
					}
				},
				resolve : {
					$title : function () { return 'Guide'; }
				}
			})
			.state('jobView', {
				url : '/job-view/:id',
				views : {
					'main' : {
						templateUrl : 'html/job-view.html',
						controller  : 'jobViewCtrl'
					}
				},
				resolve : {
					$title : function () { return 'Job View'; }
				}
			})
			.state('companyView', {
				url : '/company-view/:id',
				views : {
					'main' : {
						templateUrl : 'html/company-view.html',
						controller : 'companyViewCtrl'
					}
				},
				resolve : {
					$title : function () { return 'Company View'; }
				}
			})
			.state('profileView', {
				url : '/profile-view/:id',
				views : {
					'main' : {
						templateUrl : 'html/profile-view.html',
						controller 	: 'profileViewCtrl'
					}
				},
				resolve : {
					$title : function () { return 'Profile View'; }
				}
			})
			.state('signOut', {
				url : '/sign-out',
				views : {
					'main' : {
						templateUrl : 'html/sign-out.html',
						controller : 'signOutCtrl'
					}
				},
				resove : {
					$disablePrevState : function () { return true; }
				}
			})
			.state('search', {
				url : '/search/:id',
				views : {
					'main' : {
						templateUrl : 'html/search.html',
						controller : 'searchCtrl'
					}
				},
				resolve : {
					$title : function () { return 'Search'; }
				}
			});

		ngToastProvider.configure({
			dismissButton : true,
			timeout : 3000
		});

	}])
	.run(['$http', '$rootScope', 'pubsub', function ($http, $rootScope, pubsub) {
		$http.defaults.transformResponse.push(function (data, headers) {
			if (headers('content-type') &&
				headers('content-type').indexOf('application/json') > -1) {
					if (typeof data !== 'object') {
						data = JSON.parse(data);
					}
					pubsub.publish('ajaxResponse', data);
			}
			return data;
		});
	}]);