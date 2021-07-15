var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const crypto=require('crypto');
var connection=require('./db');
var sendFunc=require("./session/send");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function verifyUser(req,res,next){
  if(req.path == "/login" || req.path == "/admin"){
    next();
  }
  else{ 
    connection.query("SELECT login_id FROM LOGIN WHERE sessionId = ?",req["cookies"]["sessionId"],function(err,rows,fields) {
      console.log(rows);
      if(rows == null && !req["cookies"]["tag"]){
        console.log("notihing");
        res.cookie("tag",1,{
          "maxAge" : 1000 * 10
        });
        res.redirect("/login");
      }  
      else if(eval(req["cookies"]["tag"])){
        next();
      }
      else{
          next();
        }
    });
  }
  
});



app.use('/', indexRouter);
app.use('/login',loginRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("Error");
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
