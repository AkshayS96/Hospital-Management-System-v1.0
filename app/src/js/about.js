// Original JavaScript code by Chirp Internet: www.chirp.com.au
  // Please acknowledge use of this code by including this header.
/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
//////////////////////////////////////////////////
//logout of the user 
var logout=document.getElementById('logout');
logout.onclick=function(){
var request=new XMLHttpRequest();
request.onreadystatechange=function(){
if(request.readyState===XMLHttpRequest.DONE)
{
if(request.status===200)
{
document.cookie="auth-token=";
document.cookie="hasura_id=";
window.location.href="/login.html";

}
else
{

}

}}
request.open('post','http://auth.c100.hasura.me/user/logout',true);
request.setRequestHeader('Content-Type','application/json');
request.setRequestHeader('authorization','Bearer '+getCookie("auth-token"));
request.send(null);
}


////////////////////////////////////////////////


  

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
var request = new XMLHttpRequest();
request.onreadystatechange=function(){
if(request.readyState===XMLHttpRequest.DONE){
if(request.status===200)
{
	obj = JSON.parse(request.responseText);
	document.getElementById('name').innerHTML=obj[0].name;
	document.getElementById('age').innerHTML=obj[0].age;
	document.getElementById('bldgrp').innerHTML=obj[0].blood_group;
	document.getElementById('date').innerHTML=obj[0].date_admitted;
	document.getElementById('address').innerHTML=obj[0].address;
  document.getElementById('gender').innerHTML=obj[0].gender;

}
else
{

}
}
}


request.open('POST','/about',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({"hasura_id": hasura_id,"auth_token":auth}));
//-----------------------------------------//
//-------Edit your details////
//-----------------------------------------------------------//
//for fetching the doctors associated to the user

var request2=new XMLHttpRequest();
request2.onreadystatechange=function(req,res){
if(request2.readyState===XMLHttpRequest.DONE){
  if(request2.status===200)
  {
    n=JSON.parse(request2.responseText);
    for(var i=0;i<n.length;i++)
    {
      document.getElementById('doctor').innerHTML=document.getElementById('doctor').innerHTML+" "+1+": "+n[i].doctor_name+"\n";
    
  }
}
else
{

}
}
}
request2.open('POST','/doctor',true);
request2.setRequestHeader('Content-Type','application/json');
request2.send(JSON.stringify({"user_id":hasura_id,"auth_token":auth}));



















//--------------------------------------------------------//
var update=document.getElementById('update');
update.onclick=function(){
var name=document.getElementById('name1').value;
var age=document.getElementById('age1').value;
var gender=document.getElementById('gender1').value;
var blood_group=document.getElementById('bld_grp').value;
var address=document.getElementById('address1').value;

var request1=new XMLHttpRequest();
request1.onreadystatechange=function(){
if(request1.readyState===XMLHttpRequest.DONE){
if(request1.status===200)
{
closeNav();
window.location.href="/about.html";
}
else 
{
}
}
}
request1.open('POST','/insert',true);
request1.setRequestHeader('Content-Type','application/json');
request1.send(JSON.stringify({"name":name,"age":age,"gender":gender,"blood_group":blood_group,"address":address,"hasura_id":hasura_id,"auth_token":auth}));

}







