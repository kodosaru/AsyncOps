#!/usr/bin/env node

var sys = require('util');
var request = require('request');

console.log("Starting first call");
var url= "http://localhost:3000" + "/video_id";
request.post(
    url,
    {json:{ "url":"https://www.youtube.com/watch?v=aSq1cez_flQ"}},
    function (error, response, body) {
        console.log("error: "+error);
		console.log("response: "+response);
		if (!error && response.statusCode == 200) {
            console.log(JSON.stringify(body));
			console.log(body.video_id);
        }
    }
);
console.log("finished first call");

// Extract the video ID from the URL using simple POST
console.log("Starting second call");
var url= "http://localhost:3000" + "/video_id";
var video_id='';
request.post(
    url,
    {json:{ "url":"https://www.youtube.com/watch?v=aSq1cez_flQ"}},
    function (error, response, body) {
        console.log("error: "+error);
		console.log("response: "+response);
		if (!error && response.statusCode == 200) {
            console.log(JSON.stringify(body));
			video_id=body.video_id;
			console.log("video_id: "+video_id);
        }
    }
);
console.log("finished second call");


