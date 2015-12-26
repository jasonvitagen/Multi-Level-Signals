angular
	.module('ui.router.fromState', [])
	.run(['$rootScope', '$state', function ($rootScope, $state) {

		var
			disabledStates = [];

		$state.previous = {};

		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

			if ($state.$current.locals.globals.$disablePrevState) {
				if (disabledStates.indexOf(toState.name) == -1) {
					disabledStates.push(toState.name);
				}
			}

			if (disabledStates.indexOf(fromState.name) > -1) {
				return;
			}

			$state.from = {
				name : fromState.name,
				params : fromParams
			}

		});

	}]);