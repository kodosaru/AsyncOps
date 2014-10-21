var express = require('express');
var util = require('util');
var bodyParser = require('body-parser');
var app = express();

// parse application/json
app.use(bodyParser.urlencoded({
		extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send(req.body);
  console.log("The value of url: "+req.url);
//  res.send('hello earth');
});

app.post('/video_id2', function(req, res){
    console.log(typeof req);
    //var request=JSON.stringify(req.body);
    console.log("req: "+JSON.stringify(util.inspect(req)));
	console.log("in the console");
	res.send('ok');
});

app.post('/video_id', function(req, res){
    console.log(typeof req);
    var url=req.body.url;
    console.log(url);
    var video_id = '';  
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;  
    var match = url.match(regExp);  
    if(match){  
        video_id = match[1];  
    } 
    console.log('YouTube video ID: '+video_id);
    res.setHeader('Content-Type','application/json=UTF-8');
    res.end(JSON.stringify({"video_id":video_id}));
});

app.post('/proto', function(req, res){
    var url=req.body.url;
    console.log(url);
    var video_id = '';  
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;  
    var match = url.match(regExp);  
    if(match){  
        video_id = match[1];  
    } 
    console.log('YouTube video ID: '+video_id);
    //res.writeHead(200, {"Content-Type":"application/json=UTF-8"});
    res.setHeader('Content-Type','application/json=UTF-8');
    //res.send({"reply":"ok"});
    res.end(JSON.stringify({"reply":"ok","mynum":5}));
    //res.end('\n');
    process.nextTick(function(){
        global.reply = {'Status':'none'};
    }); 
});

app.listen(3000);
