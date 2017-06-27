var express=require('express');
var router=express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.json());

//this is router js for routing 

router.get('/', function (req, res) {
    res.sendFile('index.html',{root:__dirname});
});

router.post('/about.html',function(req,res){
res.sendFile('about.html',{root:__dirname});
});
//below are all the files that i have to send to the pages as requested 
router.get('/css/freelancer.min.css',function(req,res){
res.sendFile('css/freelancer.min.css',{root:__dirname});
});
router.get('/js/main.js',function(req,res){
	res.sendFile('js/main.js',{root:__dirname});
});


router.get('/vendor/bootstrap/css/bootstrap.min.css',function(req,res){
res.sendFile('vendor/bootstrap/css/bootstrap.min.css',{root:__dirname});
});

router.get('/vendor/font-awesome/css/font-awesome.min.css',function(req,res){

res.sendFile('vendor/font-awesome/css/font-awesome.min.css',{root:__dirname});
});

router.get('/vendor/font-awesome/css/bootstrap.css',function(req,res){

res.sendFile('vendor/bootstrap/css/bootstrap.css',{root:__dirname});
});

router.get('/img/hospital.png',function(req,res)
{
res.sendFile('img/hospital.png',{root:__dirname});
});

router.get('/vendor/jquery/jquery.min.js',function(req,res)
{
res.sendFile('vendor/jquery/jquery.min.js',{root:__dirname});
});

router.get('/vendor/bootstrap/js/bootstrap.min.js',function(req,res)
{
res.sendFile('vendor/bootstrap/js/bootstrap.min.js',{root:__dirname});
});

router.get('/js/jqBootstrapValidation.js',function(req,res)
{
res.sendFile('js/jqBootstrapValidation.js',{root:__dirname});

router.get('/js/contact_me.js',function(req,res)
{
res.sendFile('js/contact_me.js',{root:__dirname});
});});

router.get('/js/freelancer.min.js',function(req,res)
{
res.sendFile('js/freelancer.min.js',{root:__dirname});
});
router.get('/mail/contact_me.php',function(req,res)
{
res.sendFile('mail/contact_me.php',{root:__dirname});
});
router.get('/login.html',function(req,res){

res.sendFile('login.html',{root:__dirname});
});

router.get('/js/login.js',function(req,res){
res.sendFile('js/login.js',{root:__dirname});
});

router.get('/css/login.css',function(req,res){

res.sendFile('css/login.css',{root:__dirname});
});

router.get('/about.html',function(req,res){

res.sendFile('about.html',{root:__dirname});

router.get('/img/profile.png',function(req,res){

res.sendFile('img/profile.png',{root:__dirname});
});
});


router.get('/img/arrow.png',function(req,res){
res.sendFile('img/arrow.png',{root:__dirname});
});


router.get('/vendor/font-awesome//fonts/fontawesome-webfont.woff2',function(req,res)
{
res.sendFile('vendor/font-awesome/fonts/fontawesome-webfont.woff2',{root:__dirname});
});
router.get('/vendor/font-awesome/fonts/fontawesome-webfont.woff',function(req,res)
{
res.sendFile('vendor/font-awesome/fonts/fontawesome-webfont.woff',{root:__dirname});
});
router.get('/vendor/font-awesome/fonts/fontawesome-webfont.ttf',function(req,res)
{
res.sendFile('vendor/font-awesome/fonts/fontawesome-webfont.ttf',{root:__dirname});
});


module.exports=router;