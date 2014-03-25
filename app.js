
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , model = require('./model.js')
  , Sequelize = require('sequelize')
  , fs = require("fs");

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.favicon());
  app.use(express.logger('dev'));
 // app.use(express.bodyParser());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
console.log("we are in app after app.get");
db = model.sequelize;
app.post('/add_mail', routes.add_mail);
console.log("we are in app after add_mail");
app.get('/athlete_home',routes.athlete_home);
console.log("after athlete_home");
app.get('/see_workouts', routes.see_workouts);
console.log("after see workouts");

app.get('/userlist', routes.userlist);

app.get('/newworkout', routes.newworkout);
app.post('/addworkout', routes.addworkout);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
