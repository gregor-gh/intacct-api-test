var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apiRouter = require("./routes/api");


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// point to react build folder
if (process.env.BUILD == "LIVE") {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
}



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api", apiRouter);

module.exports = app;
