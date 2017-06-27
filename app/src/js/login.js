
$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});


var login = document.getElementById('loginBtn');

login.onclick = function(){

var request = new XMLHttpRequest();
var username=document.getElementById("Username").value;
var password=document.getElementById("Password").value;

request.onreadystatechange=function(){
	if(request.readyState===XMLHttpRequest.DONE){

if(request.status===200)
{
	string =JSON.parse(request.response);
	document.cookie="auth-token="+string.auth_token;
	document.cookie="hasura_id="+string.hasura_id;
	window.location.href="/about.html";
}
else if(request.status===409)
{
	document.getElementById('go').innerHTML="Invalid Crendentials";
	setTimeout(function(){
		document.getElementById('go').innerHTML="Go";
	},2000);
}
else
{
	document.getElementById('go').innerHTML="Some Error occur Please Try Again!";
	setTimeout(function(){
		document.getElementById('go').innerHTML="Go";
	},2000);
}
}
}

request.open('POST','/login',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({"username": username,"password": password}));
login.value='Logging in...';
};

var register=document.getElementById("register");

register.onclick=function(){

var request = new XMLHttpRequest();

request.onreadystatechange=function(){
if(request.readyState===XMLHttpRequest.DONE){
if(request.status===200)
{
	$('.container').stop().removeClass('active');
}
else if(request.status===409)
{
	document.getElementById('sp').innerHTML="Username already exist";
}
else 
{
	document.getElementById('sp').innerHTML="registration failed";
	setTimeout(function(){
		document.getElementById('sp').innerHTML="Next";
	},2000);
}
}
}
var username1=document.getElementById("Username1").value;
var password1=document.getElementById("Password1").value;
var rp=document.getElementById("rp").value;
if(password1===rp)
{
request.open('POST','http://auth.c100.hasura.me/signup',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({"username": username1, "password":password1}));

document.getElementById('sp').value="Registering....";

}
else
{
	document.getElementById('sp').innerHTML="password not matched";
	setTimeout(function(){
document.getElementById('sp').innerHTML="Next";
	},3000);
	
}



};



