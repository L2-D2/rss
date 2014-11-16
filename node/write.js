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
	writeJSON();
})

var writeJSON = function() {
	db.newSearchBuilder()
		.collection("toRead")
		.limit(40)
		.sort("pubDate", "asc")
		.query('*')
		.then(function(res) {
		console.log(res.body.results);
		// var sorted = res.body.results.sort(function(a,b){
		// 		if (a.value.pubDate > b.value.pubDate) {
		// 			return 1;
		// 		} else if (a.value.pubDate < b.value.pubDate) {
		// 			return -1;
		// 		} else return 0;
		// 	})
		fs.writeFile("../feeds/toRead.json", JSON.stringify(res.body.results), function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("The file was saved!");
		    }
		});
		// console.log(res);
	})

	// db.list("toRead")
	// 	.sort(function(a,b){
	// 		if (a.value.pubDate > b.value.pubDate) {
	// 			return 1;
	// 		} else if (a.value.pubDate < b.value.pubDate) {
	// 			return -1;
	// 		} else return 0;
	// 	}).then(function(res) {
	// 		console.log(res.body.results);
	// 		fs.writeFile("../feeds/toRead.json", JSON.stringify(res.body.results), function(err) {
	// 		    if(err) {
	// 		        console.log(err);
	// 		    } else {
	// 		        console.log("The file was saved!");
	// 		    }
	// 		});
	// 		// console.log(res);
	// 	});

	// db.list("toRead").then(function(res){
	// 	console.log(res.body.results)
	// })
};
