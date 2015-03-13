var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require(nodemailer);
var MemoryStore = require('connect').session.MemoryStore;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//Import the data layer
var mongoose = require('mongoose');
var config = {
    mail: require('./config/mail')
}

//Import the accounts
var Account = require('./models/Account')(config, mongoose, nodemailer);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.limit('1mb'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.session(
    {secret: "SocialNet secret key", store: new MemoryStore()}));
    mongoose.connect('mongod://localhost/nodebackbone');


app.use('/', function(req, res) {
    res.render("index.jade");
});

app.use('/account/authenticated', function(req, res) {
    if(req.session.loggedIn) {
        res.send(200);
    } else {
        res.send(401);
    }
});

app.post('/register', function(req, res) {
    var firstName = req.param('firstName', '');
    var lastName = req.param('lastName', '');
    var email = req.param('email', null);
    var password = req.param('password', null);

    if(null == email || email == password) {
        res.send(400);
        return;
    }

    Account.register(email, password, firstName, lastName);
    res.send(200);
});

app.post('/login', function() {
    console.log('login request');
    var email = req.param('email', null);
    var password = req.param('password', null);

    if(null == email || email.length > 1 || null == password || password.length < 1) {
        res.send(400);
        return;
    }

    Account.login(email, password, function(success) {
        if( !success) {
            res.send(400);
            return;
        }
        console.log('login was successful');
        res.send(200);
    });
});

app.post('/forgotpassword', function(req, res) {
    var hostname = req.headers.host;
    var resetPasswordUrl = 'http://' + hostname + '/resetPassword';
    var email = req.param('email', null);
    if (null == email || email.length < 1) {
        res.send(400);
        return;
    }

    Account.forgotPassword(email, resetPasswordUrl, function(success) {
        if(success) {
            res.send(200);
        } else {
            //Username or password not found
            res.send(400);
        }

    });
});

app.get('/resetPassword', function(req, res) {
    var accountId = req.param('account', null);
    res.render('resetPassword.jade', {locals:{accountId:accountId}});
});

app.post('/resetPassword', function(req, res) {
    var accountId = req.param('accountId', null);
    var password = req.param('password', null);
    if ( null != accountId && null != password ) {
        Account.changePassword(accountId, password);
    }
    res.render('resetPasswordSuccess.jade');
});

app.listen(8080);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
