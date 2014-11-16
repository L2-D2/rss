$( document ).ready(function() {
	$.getJSON("feeds/toRead.json", function(data) {
		// $( data ).find("item").each(function() {
		// 	var theItem = $( this );
		try {
			for (each in data) {
				console.log(each);
				$( ".container-fluid" ).append("<h3><a href="+data[each].value.link+">"+data[each].value.title[0]+"</a></h3>");
				$( ".container-fluid" ).append("<h4>"+data[each].value.pubDate+"</h4>");
				$( ".container-fluid" ).append("<div class='post'><a href="+data[each].value.link+">"+data[each].value.description[0]+"</a></div>");

				// $( ".container-fluid" ).append("<div>"+data[each].value.link+"<br><br><br></div");
			}
		} catch (e) {
			console.log(e);
		}
		// console.log(data);

		// });
	});
});

// $.getFeed({
// 	url: 			 "http://www.questionablecontent.net/QCRSS.xml",
// 	success: 	function(feed) {
// 		console.log(feed.title);
// 	}
// })

// var db = require('orchestrate');
//
// $( document ).ready(function() {
// 	db.newSearchBuilder()
// 		.collection("toRead")
// 		.sort("value.pubDate", 'asc')
// 		.query('*')
// 		.then(function(res) {
// 		// console.log(res.body.results);
// 		for (each in res.body.results) {
//
// 			$( ".container-fluid" ).append(res.body.results[each].value.description);
//
// 		}
// 	})
// });
