$( document ).ready(function() {
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
	  $( ".container-fluid" ).append(xhr.responseXML);
	}
	xhr.onerror = function() {
	  dump("Error while getting XML.");
	}
	xhr.open("GET", "www.xkcd.com/rss");
	xhr.responseType = "document";
	xhr.send();
})
