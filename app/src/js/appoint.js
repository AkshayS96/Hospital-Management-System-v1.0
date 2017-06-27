//in this we have the appointment script 
var logout=document.getElementById('logout');
logout.onclick=function(){
	function getCookie(name)
  {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }
 
 var hasura_id=getCookie("hasura_id");
 console.log(hasura_id);
 var auth=getCookie("auth-token");
 console.log(auth);


var request3=new XMLHttpRequest();
request3.onreadystatechange=function(){
if(request3.readyState===XMLHttpRequest.DONE)
{
if(request3.status===200)
{
document.cookie="auth-token=";
document.cookie="hasura_id=";
window.location.href="/login.html";

}
else
{
}
}}
request3.open('post','http://auth.c100.hasura.me/user/logout',true);
request3.setRequestHeader('Content-Type','application/json');
request3.setRequestHeader('authorization','Bearer '+getCookie("auth-token"));
request3.send(null);
};

// all the values of the elements are taken below
var select=document.getElementById('section');
//Request to the database to fetch all the doctors with the sectioon selected 
//this will be called when the value of the select section changes then this will be called
document.getElementById('section').onchange=function(){
	var section = select.options[select.selectedIndex].value;
var data = JSON.stringify({
  "type": "select",
  "args": {
    "table": "doctor_data",
    "columns": [
      "doctor_name",
      "doctor_special"
    ],
    "where": {
      "doctor_section": section
    }
  }
});
var request=new XMLHttpRequest();
request.onreadystatechange=function(){
if(request.readyState===XMLHttpRequest.DONE){
	if(request.status===200){
		//object to get all the values
		n=JSON.parse(request.responseText);
		console.log(n);
		var t=" ";
		for(var i=0;i<n.length;i++)
		{
		t=t+'<li id="list1"><a href="#" onclick="myclick(this)">' +n[i].doctor_name+'</a></li>';

		}
		var string=t.toString();
		document.getElementById('select_doctor').innerHTML=string;
	}
	else
	{
		console.log("some error occured");
}}}
request.open('POST','http://data.c100.hasura.me/v1/query',true);
request.setRequestHeader('Content-Type','application/json');
request.send(data);
}




// this is to send all the values to the server for the appointment
var appoint = document.getElementById('appoint');
appoint.onclick=function(){
var date=document.getElementById('date').value;
var message=document.getElementById('message').value;
var name=document.getElementById('name').value;
var email=document.getElementById('email').value;
var phone=document.getElementById('phone').value;
var doctor= document.getElementById('doctor_selected').value;
var section = select.options[select.selectedIndex].value;
function getCookie(name)
  {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }
 
 var hasura_id=getCookie("hasura_id");
 console.log(hasura_id);
 var auth=getCookie("auth-token");
 console.log(auth);
//above are all the values we want 
//in this we have to send all the details
var request = new XMLHttpRequest();
request.onreadystatechange=function(){
if(request.readyState===XMLHttpRequest.DONE)
{
	if(request.status===200)
	{
//when request is 200 then it will take place
document.getElementById('appoint').innerHTML="Appointment Confrimed";
setInterval(function(){
document.getElementById('appoint').innerHTML="Send";
},2000);


	}
	else
	{
document.getElementById('appoint').innerHTML="Some Error Occured";
setInterval(function(){
document.getElementById('appoint').innerHTML="Send";
},2000);
	}
}
}
request.open('POST','/appoint',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({"name":name,"email":email,"phone":phone,"doctor":doctor,"date":date,"section":section,"message":message,"user_id":hasura_id,"auth_token":auth}));

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

var request1=new XMLHttpRequest();
request1.onreadystatechange=function(){
if(request1.readyState===XMLHttpRequest.DONE){
	if(request1.status===200)
	{
 n =JSON.parse(request1.responseText);
 for(var i=0;i<n.length;i++)
 {

 	document.getElementById('section').innerHTML=document.getElementById('section').innerHTML+"<option>"+n[i].section_name+"</option>";
 }

	}
	else
	{
console.log("some error occured");
	}
}
}
request1.open('POST','http://data.c100.hasura.me/v1/query',true);
request1.setRequestHeader('Content-Type','application/json');
request1.send(data);

function myclick(a)
{
	
	document.getElementById('doctor_selected').value=a.innerHTML;
}

//for updating the appointment
var appoint_update = document.getElementById('appoint_update');
appoint_update.onclick=function(){
var date=document.getElementById('date').value;
var message=document.getElementById('message').value;
var name=document.getElementById('name').value;
var email=document.getElementById('email').value;
var phone=document.getElementById('phone').value;
var doctor= document.getElementById('doctor_selected').value;
var section = select.options[select.selectedIndex].value;
function getCookie(name)
  {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }
 
 var hasura_id=getCookie("hasura_id");
 console.log(hasura_id);
 var auth=getCookie("auth-token");
 console.log(auth);
//above are all the values we want 
//in this we have to send all the details
var request2 = new XMLHttpRequest();
request2.onreadystatechange=function(){
if(request2.readyState===XMLHttpRequest.DONE)
{
	if(request2.status===200)
	{
//when request is 200 then it will take place
document.getElementById('appoint_update').innerHTML="Appointment Updated";
setInterval(function(){
document.getElementById('appoint_update').innerHTML="Update";
},2000);


	}
	else
	{
document.getElementById('appoint_update').innerHTML="Some Error Occured";
setInterval(function(){
document.getElementById('appoint_update').innerHTML="Update";
},2000);
	}
}
}
request2.open('POST','/appoint_update',true);
request2.setRequestHeader('Content-Type','application/json');
request2.send(JSON.stringify({"name":name,"email":email,"phone":phone,"doctor":doctor,"date":date,"section":section,"message":message,"user_id":hasura_id,"auth_token":auth}));

}



//canceling the appointment when user click on the cancel button
var appoint_cancel=document.getElementById('appoint_cancel');
appoint_cancel.onclick=function(){
	function getCookie(name)
  {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }
 
 var hasura_id=getCookie("hasura_id");
 console.log(hasura_id);
 var auth=getCookie("auth-token");
 console.log(auth);
//the above function will get hasura_id and auth_token from the cookies
var request1=new XMLHttpRequest();
request1.onreadystatechange=function(){
if(request1.readyState===200)
{
document.getElementById('appoint_cancel').innerHTML="Appointment Cancelled";
setInterval(function(){
document.getElementById('appoint_cancel').innerHTML="Cancel";
},2000);
}
else
{

}

}


request1.open('POST','/appoint_cancel',true);
request1.setRequestHeader('Content-Type','application/json');
request1.send(JSON.stringify({"user_id":hasura_id,"auth_token":auth}));
};












