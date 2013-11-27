
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var login = require('./routes/login');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var schema = require('../models/User');
var User_model = schema.User;

var app = express();

//Se conecta a la base de datos
/*
mongoose.connect('mongodb://localhost/registro');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error en la conexion:'));
db.once('open', function callback () {
      console.log('Conectado a la BD');
});*/
/*
//se crean los Schema
var userSchema = mongoose.Schema({
    username: String,
    password: String
});
userSchema.methods.validPassword = function (password) {
    if (password === this.password) {
        return true; 
    } else {
        return false;
    }
}
*/
//var user = new User({ username: 'cristian', password: '123' });
//user.save();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.use(express.cookieParser('your secret here'));
//app.use(express.session());
//app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));

//use of passport
app.configure(function() {
    app.use(express.static('public'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
});
//end
passport.use(new LocalStrategy(function(username, password, done) {
    User_model.findOne({ username: username }, function(err, userx) {
        if (err) { 
            return done(err); 
            }
            if (!userx) {
                return done(null, false, { message: 'Incorrect username.' });
                }
            if (!userx.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
                }
            return done(null, userx);
            });
    }
));

passport.serializeUser(function(user, done) {
      done(null, user.id);
});

passport.deserializeUser(function(id, done) {
      User_model.findById(id, function(err, user) {
              done(err, user);
                });
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));

app.get('/login', login.login);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
