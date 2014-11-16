var http = require("http");
var fs = require("fs");
var db = require("orchestrate")("1e0ec7a3-1aaf-4952-9a48-099fa467cf83");
var parseString = require("xml2js").parseString;
var feeds = [];

//Update the feeds list
db.search("feeds", "*").then(function(res) {
	// console.log(res.body);
	for (item in res.body.results) {
		// console.log(res.body.results[item].value);
		feeds.push(res.body.results[item].value);
		// console.log(feeds);
	}
	logFeedTitles();
});

var logFeedTitles = function() {
	for (feed in feeds) {
		// console.log("http request to "+feeds.feed);
		http.request(feeds[feed], function(res) {
			var str = "";
			res.on('data', function(chunk) {
				str += chunk;
			});
			res.on('end', function() {
				parseString(str, function(err, result) {
					// console.log(result.rss.channel[0].title);
					if (err) console.log(err);
					console.log(result)

				})
			})
		}).end();
	};
};
