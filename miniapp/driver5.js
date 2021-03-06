#!/usr/bin/env node

var sys = require('util');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');

function parse_data(data) {  
   var results = [];  
   var r = 0;  
   data = (data+'').replace(/\+/g, '%20');  
   data = data.replace(/url%3D/g, '\n\r\n\r<break>');  
   data = data.replace(/sig%3D/g, 'signature%3D');  
   var urls = data.split('<break>');  

   for(var u = 0; u < urls.length; u++){  
       var result = {};  
       var d = unescape(unescape(decodeURIComponent((urls[u]+'').replace(/\+/g, '%20'))));  
       d = d.replace(/="/g, '%3D%22');  
       d = d.replace(/"/g, '%22');  
       var url = d;  
       //console.log('URL: '+d);  
       //console.log('URL length: '+d.length);  
	   //console.log('*************************************************************');

       if(d.length > 1500){  
		   aux = d.split('&has_cc');  
		   d = aux[0];  
       }  
       var vars = [], hash;  
       var hashes = d.slice(d.indexOf('?') + 1).split('&');  

       for(var i = 0; i < hashes.length; i++){  
		   hash = hashes[i].split('=');  
		   vars.push(hash[0]);  
		   vars[hash[0]] = unescape(hash[1]);  
       }  

       if(vars['type']!=undefined){  
		   result.type = vars['type'];  
		   if(vars['type'].indexOf("codecs")>0){  
			   var cs = vars['type'].split(';+codecs="');  
			   result.type = cs[0];  
			   result.codecs = cs[1].replace('"','').replace('+',' ');  
		   }  
       }  

       //quality  
       if(vars['quality']!=undefined){  
		   result.quality = vars['quality'];  
		   if(vars['quality'].indexOf(",")>0){  
			   var cs = vars['quality'].split(',');  
			   result.quality = cs[0];  
		   }  
       }  

       if(result.type && result.quality){  
		   result.url = url;  
		   results[r] = result;  
		   r++;  
       }  
	   console.log(result.url);  
	   console.log(result.quality);  
   }
}  



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
					//console.log(JSON.stringify(data));
					parse_data(data);
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

