require('dotenv').config();
require('./config/passport');

var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport =  require('passport');
var validator = require('express-validator');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var app = express();



mongoose.connect('mongodb://'+ process.env.DB_HOSTNAME +':'+ process.env.DB_PORT +'/' +process.env.DB, { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false
    }
));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});
app.use('/user', userRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;

