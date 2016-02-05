angular
	.module('signals')
	.directive('focusOnLoad', [function () {
		var ddo = {};
		ddo.link = function (scope, element, attrs) {
			element[0].focus();
		}
		return ddo;
	}])
	.directive('focusOnClick', [function () {
		var ddo = {};
		ddo.link = function (scope, element, attrs) {
			if (!attrs['focusOnClick']) {
				return;
			}
			element.on('click', function () {
				document.getElementById(attrs['focusOnClick']).focus();
			});
		};
		return ddo;
	}])
	.directive('fieldCharacterCount', [function () {
		var ddo = {};
		ddo.require = 'ngModel';
		ddo.scope = {
			characterCount : '=fieldCharacterCount'
		};
		ddo.link = function (scope, element, attrs, ctrl) {
			ctrl.$formatters.push(function (val) {
				try {
					scope.characterCount = val.length;
				} catch (err) {
					scope.characterCount = 0;
					console.log(err);
				}
				return val;
			});
			ctrl.$viewChangeListeners.push(function () {
				scope.characterCount = ctrl.$viewValue.length;
			});
		}
		return ddo;
	}])
	.directive('readFile', [function () {
		var ddo = {};
		ddo.require = 'ngModel';
		ddo.scope = {
			validFileTypes : '@',
			maxFileSize : '@'
		};
		ddo.link = function (scope, element, attrs, ctrl) {
			ctrl.$validators.fileType = function (modelValue, viewValue) {
				if (!viewValue) {
					return true;
				}
				return new RegExp('(' + scope.validFileTypes + ')').test(viewValue);
			};
			var reader = new FileReader();
			reader.onload = function (loadEvent) {
				scope.$apply(function () {
					ctrl.$setViewValue(loadEvent.target.result);
				});
			};
			element.on('change', function (changeEvent) {
				if (Object.keys(changeEvent.target.files).length <= 0) {
					scope.$apply(function () {
						ctrl.$setValidity('fileType', true);
						if (attrs['required']) {
							ctrl.$setValidity('required', false);
						}
					});
					return;
				}
				if (scope.maxFileSize) {
					if (changeEvent.target.files[0].size > scope.maxFileSize) {
						scope.$apply(function () {
							ctrl.$setValidity('fileSize', false);
						});
					} else {
						scope.$apply(function () {
							ctrl.$setValidity('fileSize', true);
						});
					}
				}			
				reader.readAsDataURL(changeEvent.target.files[0]);
			});
		}
		return ddo;
	}]);