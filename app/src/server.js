var express = require('express');
var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.json());
var request1=require('request-promise');
// now adding the http server for the socket.io


var server = app.listen(8080, function () {
  console.log('Example app listening on port 8000!');
});

var io=require('socket.io').listen(server);


var hasura_id;
//for chatting interface of the user
app.post('/user_chat',function(req,res){
hasura_id = req.body.hasura_id;
res.status(200).send();

io.on('connection',function(socket){
	//console.log("connected");
	//console.log("a user is connected");
socket.on(hasura_id+'',function(msg){
	console.log(hasura_id +" user is connected");
	var a=hasura_id+'';
	console.log(a);
socket.emit(a,"hey this is some information");
socket.on(a,function(){
console.log("user disconnected");
});

});
});



});




app.post('/login',function(req,res){
var username = req.body.username;
var password= req.body.password;
const options ={
	method: 'POST',
	uri: 'http://auth.c100.hasura.me/login',
	body: {
		"username": username,
		"password": password
	},
	json: true
}


request1(options)
  .then(function(response){
  	console.log(response);
  	res.send(response);
  })
  .catch(function(err){
  	console.log(err);
  	res.status(409).send();
  	console.log("some error occurs");
  });
});

//--------------------------------------//

// End point for the about screen  //
app.post('/about',function(req,res){
var hasura_id = req.body.hasura_id 
var auth_token=req.body.auth_token;
var options = { method: 'POST',
  url: 'http://data.c100.hasura.me/v1/query',
  headers: 
   { 'postman-token': '401ecc4f-4ce2-f5e4-5cab-591e0a41d6ac',
     'cache-control': 'no-cache',
     authorization: 'Bearer '+auth_token,
     'content-type': 'application/json' },
  body: 
   { type: 'select',
     args: 
      { table: 'user',
        columns: [ '*'],
        where: { hasura_id: hasura_id } } },
  json: true }

request1(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(error);
console.log("im here");
  console.log(body[0]);
  res.send(body);

});
});

app.post('/insert',function(req,res){
var name=req.body.name;
    age=req.body.age;
    blood_group=req.body.blood_group;
    address=req.body.address;
    gender=req.body.gender;
    auth_token=req.body.auth_token;
    hasura_id=req.body.hasura_id;


var request = require("request");

var options = { method: 'POST',
  url: 'http://data.c100.hasura.me/v1/query',
  headers: 
   { 'postman-token': '723982d7-390c-e376-3bbb-b160e88c9e26',
     'cache-control': 'no-cache',
     authorization: 'Bearer '+auth_token,
     'content-type': 'application/json' },
  body: 
   { type: 'update',
     args: 
      { table: 'user',
        role: 'user',
        '$set': { name: name, age: age,address: address, gender: gender, blood_group: blood_group},
        where: { hasura_id: hasura_id },
        returning: [ 'hasura_id' ] } },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  else
  {
  	res.status(200).send();
  }

  console.log(body);
});

});

app.post('/appoint',function(req,res){
var name = req.body.name;
var email=req.body.email;
var phone=req.body.phone;
var doctor=req.body.doctor;
var date=req.body.date;
var message=req.body.message;
var user_id=req.body.user_id;
var auth_token=req.body.auth_token;
var section=req.body.section;

//these are the values that i have to send 

var request = require("request");

var options = { method: 'POST',
  url: 'http://data.c100.hasura.me/v1/query',
  headers: 
   { 'postman-token': '17575cf0-6890-a70b-3209-fea7cde8cf2d',
     'cache-control': 'no-cache',
     authorization: 'Bearer '+auth_token,
     'content-type': 'application/json' },
  body: 
   { type: 'insert',
     args: 
      { table: 'appointment',
        objects: 
         [ { doctor_name: doctor,
             user_name: name,
             date: date,
             user_email: email,
             user_number: phone,
             message: message,
             user_id: user_id } ] } },
  json: true };

request(options, function (error, response, body) {
  if(response.statusCode===200)
  	res.status(200).send();
  else
  	res.status(403).send();

  console.log(body);
});
});

//now updating the appointment 
app.post('/appoint_update',function(req,res){
var name = req.body.name;
var email=req.body.email;
var phone=req.body.phone;
var doctor=req.body.doctor;
var date=req.body.date;
var message=req.body.message;
var user_id=req.body.user_id;
var auth_token=req.body.auth_token;
var section=req.body.section;

var request = require("request");

var options = { method: 'POST',
  url: 'http://data.c100.hasura.me/v1/query',
  headers: 
   { 'postman-token': '9bf998fc-ec22-47de-36b1-7dfdb17a8768',
     'cache-control': 'no-cache',
     authorization: 'Bearer '+auth_token,
     'content-type': 'application/json' },
  body: 
   { type: 'update',
     args: 
      { table: 'appointment',
        '$set': { "doctor_name": doctor,"user_number":phone,"date":date,"user_name":name,"user_email":email },
        where: { user_id: user_id } } },
  json: true };

request(options, function (error, response, body) {
if(response.statusCode===200)
{
	res.status(200).send();
}
else
{
	res.status(408).send();
}
});
});
//api request to the cancel api to delete the appointment

app.post('/appoint_cancel',function(req,res){
var user_id=req.body.hasura_id;
var auth_token=req.body.auth_token;


var request = require("request");

var options = { method: 'POST',
  url: 'http://data.c100.hasura.me/v1/query',
  headers: 
   { 'postman-token': '136dd9ec-feaf-05ec-d010-04774939afc1',
     'cache-control': 'no-cache',
     authorization: 'Bearer '+auth_token,
     'content-type': 'application/json' },
  body: 
   { type: 'delete',
     args: { table: 'appointment', where: { user_id: user_id } },
     returning: [ 'id' ] },
  json: true };

request(options, function (error, response, body) {
  if(response.statusCode===200)
  {
res.status(200).send();
  }
  else
  {
res.status(408).send();
  }
});



});
//for finding doctors 
//-------------------------------------------///

app.post('/doctor',function(req,res){
var user_id=req.body.user_id;
var auth=req.body.auth_token;

var request = require("request");

var options = { method: 'POST',
  url: 'http://data.c100.hasura.me/v1/query',
  headers: 
   { 'postman-token': 'f06aef58-5f88-8eb5-cf90-91280ab8010c',
     'cache-control': 'no-cache',
     authorization: 'Bearer '+auth,
     'content-type': 'application/json' },
  body: 
   { type: 'select',
     args: 
      { table: 'appointment',
        columns: [ 'doctor_name' ],
        where: { user_id: user_id } } },
  json: true };

request(options, function (error, response, body) {
  if(response.statusCode===200)
  {
res.status(200).send(body);
  }
  else
  	{

  	}
  	  console.log(body);
});







});







//---------------------------------------------//




app.get('/', function (req, res) {
    res.sendFile('index.html',{root:__dirname});
});


app.get('/appointment',function(req,res){
res.sendFile('appointment.html',{root:__dirname});

});

app.get('/chat',function(req,res){
res.sendFile('chat.html',{root:__dirname});
});
app.get('/css/about.css',function(req,res){

res.sendFile('css/about.css',{root:__dirname});
});

app.get('/about.html',function(req,res){
	res.sendFile('about.html',{root:__dirname});
});
app.get('/js/about.js',function(req,res){
res.sendFile('js/about.js',{root:__dirname});
});

app.get('/js/chat.js',function(req,res){
res.sendFile('js/chat.js',{root:__dirname});
});
//below are all the files that i have to send to the pages as requested 
app.get('/css/freelancer.min.css',function(req,res){
res.sendFile('css/freelancer.min.css',{root:__dirname});
});
app.get('/js/main.js',function(req,res){
	res.sendFile('js/main.js',{root:__dirname});
});

app.get('/js/appoint.js',function(req,res){
res.sendFile('js/appoint.js',{root:__dirname});
});

app.get('/vendor/bootstrap/css/bootstrap.min.css',function(req,res){
res.sendFile('vendor/bootstrap/css/bootstrap.min.css',{root:__dirname});
});

app.get('/vendor/font-awesome/css/font-awesome.min.css',function(req,res){

res.sendFile('vendor/font-awesome/css/font-awesome.min.css',{root:__dirname});
});

app.get('/vendor/font-awesome/css/bootstrap.css',function(req,res){

res.sendFile('vendor/bootstrap/css/bootstrap.css',{root:__dirname});
});

app.get('/img/hospital.png',function(req,res)
{
res.sendFile('img/hospital.png',{root:__dirname});
});

app.get('/vendor/jquery/jquery.min.js',function(req,res)
{
res.sendFile('vendor/jquery/jquery.min.js',{root:__dirname});
});

app.get('/vendor/bootstrap/js/bootstrap.min.js',function(req,res)
{
res.sendFile('vendor/bootstrap/js/bootstrap.min.js',{root:__dirname});
});

app.get('/js/jqBootstrapValidation.js',function(req,res)
{
res.sendFile('js/jqBootstrapValidation.js',{root:__dirname});

app.get('/js/contact_me.js',function(req,res)
{
res.sendFile('js/contact_me.js',{root:__dirname});
});});

app.get('/js/freelancer.min.js',function(req,res)
{
res.sendFile('js/freelancer.min.js',{root:__dirname});
});
app.get('/mail/contact_me.php',function(req,res)
{
res.sendFile('mail/contact_me.php',{root:__dirname});
});
app.get('/login.html',function(req,res){

res.sendFile('login.html',{root:__dirname});
});

app.get('/js/login.js',function(req,res){
res.sendFile('js/login.js',{root:__dirname});
});

app.get('/css/login.css',function(req,res){

res.sendFile('css/login.css',{root:__dirname});
});

app.get('/about.html',function(req,res){

res.sendFile('about.html',{root:__dirname});

app.get('/img/profile.png',function(req,res){

res.sendFile('img/profile.png',{root:__dirname});
});
});


app.get('/img/arrow.png',function(req,res){
res.sendFile('img/arrow.png',{root:__dirname});
});


app.get('/vendor/font-awesome//fonts/fontawesome-webfont.woff2',function(req,res)
{
res.sendFile('vendor/font-awesome/fonts/fontawesome-webfont.woff2',{root:__dirname});
});

app.get('/vendor/font-awesome/fonts/fontawesome-webfont.woff',function(req,res)
{
res.sendFile('vendor/font-awesome/fonts/fontawesome-webfont.woff',{root:__dirname});
});

app.get('/vendor/font-awesome/fonts/fontawesome-webfont.ttf',function(req,res)
{
res.sendFile('vendor/font-awesome/fonts/fontawesome-webfont.ttf',{root:__dirname});
});

app.use(bodyParser.json({limit: '50mb'}));
//for sending the landing page when starting 
