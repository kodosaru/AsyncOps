var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
/*    $.ajax({
        method: 'post',
        url: servUrl + '/foobar',
        data: {'Session': 'somevalue'},
        success: function(reply) {
            console.log(reply);
        }
    });*/
xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET","http://localhost:3000/foobar", true);
xmlhttp.onreadystatechange=function(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		string=xmlhttp.responseText;
		console.log(string);
	}
}
console.log("sending request");
xmlhttp.send();
