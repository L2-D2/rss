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
	populateDatabase();
});


var populateDatabase = function() {
	console.log('new function');
	for (feed in feeds) {
		http.request(feeds[feed], function(res) {
			var str = "";

			res.on('data', function(chunk) {
				str += chunk;
			});

			res.on('end', function() {
				console.log("parsing")
				parseString(str, function(err, result) {
					var thisFeed = result.rss.channel[0].title[0];
					// console.log(result.rss.channel[0]);
					for (i in result.rss.channel[0].item) {
						var myItem = result.rss.channel[0].item[i];

						myItem.pubDate = new Date(myItem.pubDate);

						if (myItem.guid) {
							if (thisFeed == "xkcd.com") {
								// console.log(myItem.guid[0]._)
								var myItemGUID = myItem.guid[0];
							} else {
								// console.log(myItem.guid[0]);
								// console.log(JSON.stringify(result.rss.channel[0].item));
								var myItemGUID = myItem.guid[0]._;
							}
						} else {
							var myItemGUID = myItem.title[0];
						}

						db.put("toRead", myItemGUID, myItem).then(function(res) {
							console.log(res.statusCode);
						});
					}
				})
			})
		}).end();
	}
};
