var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// parse application/json
app.use(bodyParser.urlencoded({
		extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send(req.body);
//  res.send('hello earth');
});

app.post('/foobar', function(req, res){
	console.log(res.body);
	console.log("in the console");
	res.send('ok');
});

app.post('/signupz', function(req, res){
    var cred = req.body;
    console.log('posted signup');
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
