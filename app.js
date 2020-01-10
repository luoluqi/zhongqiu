var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var wxUtil = require("./util/wxUtil");
require("./util/resetNum");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var wechatRouter = require("./routes/wechat");
var giftRouter = require("./routes/gift");
var spreadRouter = require("./routes/spread");



var app = express();

global.round = 1;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
var errorLog = fs.createWriteStream(path.join(__dirname, 'error.log'), {flags: 'a'});
app.use(logger({ stream: errorLog }));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// //设置允许跨域访问该服务.
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use("/wechat",wechatRouter);
app.use('/gift', giftRouter);
app.use("/spread",spreadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	
	fs.appendFile(path.join(__dirname, 'error.log'), err.message + "\\n" + err.stack, error => {
		
	  });
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
