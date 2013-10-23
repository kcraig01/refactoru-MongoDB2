
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongoose.connect('mongodb://localhost/girlpower');

var Applicant = mongoose.model('Applicant', { 
	name: String,
	bio: String,
	skills: String,
	years: Number,
	why: String,
	view: String
 });


//renders the index page
app.get('/', function(req, res){
	res.render('index')
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	Applicant.find({}, function (err,data){
		res.render('applicants', {applicants: data})
	});
});

// creates and applicant
app.post('/applicant', function(req, res){
	console.log(req.body.name)
	var applicant1 = new Applicant({
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		years: req.body.years,
		why: req.body.why,
		view: true
	})
	applicant1.save();
	res.send({success : applicant1});
});

app.get('/deleteapp', function(req, res){
	var deleted = req.query.remove;
	console.log(deleted);
	Applicant.remove({ _id: deleted}, function(error){
		console.log(error);
		res.send({removed: deleted})
	});
	
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
