// this is the chat js for accessing the socket,io from the client side

var send = document.getElementById('send');

send.onclick=function() {
	//when the send button is clicked then this event is done 
 // now we have to find out the hasura_id and the auth_token
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

//first we have to send the channel on which the server has to listen and emit the message
var request = new XMLHttpRequest();
request.onreadystatechange=function(){
	if(request.readyState===XMLHttpRequest.DONE)
	{
		if(request.status===200)
		{
			var socket=io();
			var id=hasura_id+"";
			socket.emit(id,document.getElementById('message').value);
			document.getElementById('messages').innerHTML=document.getElementById('messages').innerHTML+'<div class="w3-card" style="background-color:cyan;"><p style="text-align:left;"><b>'+hasura_id+"</b>&nbsp;"+" :"+document.getElementById('message').value+ "</p></div>";
			socket.on(id,function(msg){
document.getElementById('messages').innerHTML=document.getElementById('messages').innerHTML+'<div class="w3-card" style="background-color:blue;"><p style="text-align:left;"><b>Admin</b>'+" :&nbsp;"+msg +" </p></div>";

			});
			}
			else
			{

			}

		}
	
}
request.open('POST','/user_chat',true);
	request.setRequestHeader('Content-type','application/json');
	request.send(JSON.stringify({"hasura_id":hasura_id,"auth_token":auth}));
};

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