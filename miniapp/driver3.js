#!/usr/bin/env node

var sys = require('util');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');
var xhr = new XMLHttpRequest();

// Extract the video ID from the URL
var method= 'post';
var url= "http://localhost:3000" + "/video_id";
var post_req = { "url":"https://www.youtube.com/watch?v=aSq1cez_flQ"};
var resp='';

xhr.onreadystatechange = function() {
	sys.puts("State: " + this.readyState);
	
	if (this.readyState == 4) {
		sys.puts("Complete.\nBody length: " + this.responseText.length);
		resp=JSON.parse(this.responseText);
		console.log(resp.video_id);
		console.log('In func video_id val: '+resp.video_id);
		console.log('response type: '+typeof this.responseText);
		console.log('response: ' + this.responseText);
		//sys.puts('Mynum: '+response.mynum);
	}
};

xhr.open(method, url);
// Setting the request header type is required
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send(JSON.stringify(post_req));
console.log("finished first call");
