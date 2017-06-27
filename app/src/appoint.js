//in this we have the appointment script 


var name=document.getElementsById('name'),value;
var email=document.getElementsById('email').value;
var phone=document.getElementById('phone').value;
var select=document.getElementById('doctor');
var doctor=select.options[select.selectedIndex].value;
var date=document.getElementById('date').value;
var message=document.getElementById(('message').value;


var appoint = document.getElementById('appoint');
appoint.onclick=function(){

var request = new XMLHttpRequest();

request.onreadystatechange=function(){
if(request.readyState===XMLHttpRequest.DONE)
{
	if(request.status===200)
	{

	}
	else
	{

	}
}



}
request.open('POST','/appoint',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({"name":name,"email":email,"phone":phone,"doctor":doctor,"date":date,"message":message}));
}
// request for the doctors available 

var data = JSON.stringify({
  "type": "select",
  "args": {
    "table": "section",
    "columns": [
      "section_name"
    ]
  }
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);



    
  }
});

xhr.open("POST", "http://data.c100.hasura.me/v1/query");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "9d5698bc-6d77-7d2a-cb7e-d54bd28dfb53");

xhr.send(data);







