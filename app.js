var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser= require('body-parser');
var path = require('path');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registrationRouter = require('./routes/registration');
var addUser = require('./routes/user/addUser');
var getUser = require('./routes/user/addUser');
var updateUser = require('./routes/user/addUser');
var deleteUser = require('./routes/user/addUser');
var signin = require('./routes/authentication/signIn');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'assets')));
// Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/registration', registrationRouter);

// API endpoints
app.use('/user', addUser);
app.use('/user', getUser);
app.use('/user', updateUser);
app.use('/user', deleteUser);
app.use('/authentication', signin);

module.exports = app;
