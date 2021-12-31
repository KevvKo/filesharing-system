require('dotenv').config();
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser= require('body-parser');
const cors = require('cors');     
var path = require('path');
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require('crypto');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registrationRouter = require('./routes/registration');
var addUser = require('./routes/user/addUser');
var getUser = require('./routes/user/addUser');
var updateUser = require('./routes/user/addUser');
var deleteUser = require('./routes/user/addUser');
var uploadFile = require('./routes/file/upload');
var deleteFile = require('./routes/file/deleteFile');
var getFiles = require('./routes/file/getFiles');
var signin = require('./routes/authentication/signIn');

const { DB_URI } = process.env 

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

var options = {
    index: false
};
app.use( express.static(path.join(__dirname, 'public'), options));
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

const storage = new GridFsStorage({ 
    url: DB_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {

                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = { filename: filename };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

app.use('/file', uploadFile(upload));
app.use('/file', getFiles);
app.use('/file', deleteFile);

module.exports = app;
