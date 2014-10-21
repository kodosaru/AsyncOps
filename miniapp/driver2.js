#!/usr/bin/env node

var sys = require('util');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var xhr = new XMLHttpRequest();

/*$.ajax({
	method: 'post',
	url: servUrl + '/signup',
	data: creds,
	success: function(reply) {
		if( reply.Status == 'ok' ) {
			logIn(creds, function(){
				if(isLoggedIn()) {
					goProfile();
				}
			});
		} else if( reply.Status == 'Exists') {
			showError('User already exists.');
		}
	}
});	                
*/
var method= 'post';
var url= "http://localhost:3000" + "/video_id";
var creds = { "email": "kodosaru@gmail.com", "password": "mypass","url":"https://www.youtube.com/watch?v=aSq1cez_flQ"};

xhr.onreadystatechange = function() {
	sys.puts("State: " + this.readyState);
	
	if (this.readyState == 4) {
		sys.puts("Complete.\nBody length: " + this.responseText.length);
		//var response=JSON.parse(this.responseText);
		//sys.puts('Reply: '+response.reply);
		//sys.puts('Mynum: '+response.mynum);
	}
};

//xhr.open("GET", "http://driverdan.com");
//xhr.open("GET", "http://localhost:3000/foobar");
xhr.open(method, url);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
console.log("typeof: "+typeof creds);
xhr.send(JSON.stringify(creds));
console.log("typeof: "+typeof JSON.stringify(creds));
//xhr.send("foobar");
//xhr.send();
