var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

var assignment = require('./assignment/app.js');
assignment(app);

var cookieParser = require('cookie-parser');
var session      = require('express-session');

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

//require("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
