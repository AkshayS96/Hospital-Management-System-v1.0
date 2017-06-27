var login = document.getElementById('loginBtn');

login.onclick = function(){

var request = new XMLHttpRequest();

request.onreadystatechange = function(){
if(request.readyState===XMLHttpRequest.DONE){
if(request.status===200){
	loginBtn.value='Sucess';

}
else if(request.status===403){
	loginBtn.value='Invalid Credentials. Try again';

}
else if(request.status===500){
	alert('Something went wrong on the server');
	submit.value='Go';
}
else
{
	alert("something is wrong");
	submit.value='Go'
}
}};

var username=document.getElementById('Username').value;
var password=document.getElementById('Password').value;

console.log(username);
console.log(password);

request.open('GET','/log',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username: username,password: password}));
login.value='Logging in...';




};
