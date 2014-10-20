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
var url= "http://localhost:3000" + "/signupz";
var creds = { "email": "kodosaru@gmail.com", "password": "mypass"};

xhr.onreadystatechange = function() {
	sys.puts("State: " + this.readyState);
	
	if (this.readyState == 4) {
		sys.puts("Complete.\nBody length: " + this.responseText.length);
		var response=JSON.parse(this.responseText);
		sys.puts('Reply: '+response.reply);
		sys.puts('Mynum: '+response.mynum);
	}
};

//xhr.open("GET", "http://driverdan.com");
//xhr.open("GET", "http://localhost:3000/foobar");
xhr.open(method, url);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//xhr.send(JSON.stringify(creds));
xhr.send();
