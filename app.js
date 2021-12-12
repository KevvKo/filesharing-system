var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser= require('body-parser')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registrationRouter = require('./routes/registration');
var addUser = require('./routes/user/addUser');
var getUser = require('./routes/user/addUser');
var updateUser = require('./routes/user/addUser');
var deleteUser = require('./routes/user/addUser');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/registration', registrationRouter);

// API endpoints
app.use('/user', addUser);
app.use('/user', getUser);
app.use('/user', getUser);
app.use('/user', deleteUser);

module.exports = app;
