module.exports = [ 	'express',
					'modules.restfulApi',
					function (express, restfulApi) {

	var
		router = express.Router();

	router.all('/logged-in-state', restfulApi.restful('template.LoggedInState'));

	return router;

}];