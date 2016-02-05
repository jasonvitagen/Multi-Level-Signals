module.exports = {
	"host" : "http://localhost:3090",
	"port" : 3090,
	"logPath" : "logs",
	"logFile" : "logs.log",
	"urlencoded" : {
		"limit" : "1mb"
	},
	"jsonencoded" : {
		"limit" : "1mb"
	},
	"session" : {
		"name" : "forexquest",
		"secret" : "1FRlUu7Jledo1JOp6otFhCIFddUHEY2m",
		"maxAge" : 604800000
	},
	"staticPath" : "public",
	"staticMaxAge" : 0,
	"mongodb" : {
		"databaseUrl" : "mongodb://127.0.0.1:27017/forexquest"
	},
	"auth" : {
		"google" : {
			"clientID" : "1088557290877-k1h93vl0kvdjkrn3rurc50dbt66g8gbr.apps.googleusercontent.com",
			"clientSecret" : "spv_ZDhNRvQhMcKTdgYYQcES",
			"callbackURL" : "",
			"successRedirect" : ""
		},
		"facebook" : {
			"clientID" : "1139553276073524",
			"clientSecret" : "cb02a0964ec1891c2d6a743dba0d30ec",
			"callbackURL" : "",
			"successRedirect" : ""
		}
	}
}