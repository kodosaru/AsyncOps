#!/usr/bin/env node

var sys = require('util');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');


// Extract the video ID from the URL using XHR
var method= 'post';
var url= "http://localhost:3000" + "/video_id";
var post_req = { "url":"https://www.youtube.com/watch?v=aSq1cez_flQ"};

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	sys.puts("State: " + this.readyState);

	if (this.readyState == 4) {
		console.log("Return from first call!!!");
		sys.puts("Complete.\nBody length: " + this.responseText.length);
		var resp=JSON.parse(this.responseText);
		console.log(resp.video_id);
		console.log('In func video_id val: '+resp.video_id);
		console.log('response type: '+typeof this.responseText);
		console.log('response: ' + this.responseText);

		// Retrieve raw video information from YouTube
		console.log("Starting YouTube call");
		var url= "http://www.youtube.com/get_video_info?video_id="+resp.video_id;

		console.log("Opening URL to query YouTube for video file choices: "+url);
		request.get(
			url,
			function (error, response, data) {
				console.log("error: "+error);
				console.log("response: "+response);
				if (!error && response.statusCode == 200) {
					console.log(JSON.stringify(data));
				}
			}				
		);
		console.log("Sent second call!!!!");
	}
};

xhr.open(method, url);
// Setting the request header type is required
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send(JSON.stringify(post_req));
console.log("finished first call");

